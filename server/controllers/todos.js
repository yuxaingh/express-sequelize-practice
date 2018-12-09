const todo = require('../models').todo;
const todoItem = require('../models').todoitem;

module.exports = {
  create(req, res){
    return todo
    .create({
      title: req.body.title
    })
    .then(todo => res.status(201).send(todo))
    .catch(err => res.status(400).send(err));
  },

  list(req, res){
    return todo.
    findAll({
      include: [{
        model: todoItem,
        as: 'todoItems'
      }]
    }).then(todos => res.status(200).send(todos))
    .catch(err => res.status(400).send(err));
  },

  retrive(req, res){
    return todo.findById(req.params.todoId, {
      include: [{
        model: todoItem,
        as: 'todoItems'
      }]
    })
    .then(todo => {
      if(todo){
        res.status(200).send(todo);
      }else{
        res.status(404).send({message: 'No data found.'});
      }
    })
    .catch(err => res.status(400).send(err));
  },

  update(req, res){
    return todo.findById(req.params.todoId,{
      include: [{
        model: todoItem,
        as: 'todoItems'
      }]
    })
    .then(todo => {
      if(!todo){
        return res.status(404).send({message: "Data not found."});
      }
      return todo.update({
        title: req.body.title || todo.dataValues.title
      })
      .then(() => res.status(200).send(todo))
      .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
  },

  destroy(req, res){
    return todo.findById(req.params.todoId)
    .then(todo => {
      if(!todo){
        return res.status(404).send({message: "Data not found"});
      }
      return todoItem.findAll({
        where: {
          todoId: req.params.todoId
        }
      })
      .then(items => {
        if(items){
          //console.log(items);
          let promises = [];
          for(let x of items){
            promises.push(x.destroy());
          }
          return Promise.all(promises);
        }
      })
      .then(() => {
        return todo.destroy()
        .then(() => res.status(204).send())
        .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
    })
    .catch(err => {
      res.status(400).send(err);
    })
  }
};
