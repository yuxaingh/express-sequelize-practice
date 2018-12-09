const todoItem = require('../models').todoitem;

// function logAllProperties(obj) {
//      if (obj == null) return; // recursive approach
//      console.log(Object.getOwnPropertyNames(obj));
//      logAllProperties(Object.getPrototypeOf(obj));
// }

module.exports = {
  create(req, res){
    return todoItem
    .create({
      content: req.body.content,
      todoId: req.params.todoId
    })
    .then(todo => res.status(201).send(todo))
    .catch(err => res.status(400).send(err));
  },

  update(req, res) {
  return todoItem
    .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
    .then(todoItem => {
      if (!todoItem) {
        return res.status(404).send({
          message: 'TodoItem Not Found'
        });
      }
      //logAllProperties(todoItem);
      return todoItem
        .update({
          content: req.body.content || todoItem.content,
          completed: req.body.completed || todoItem.completed,
        })
        .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
return todoItem
  .find({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId,
      },
    })
  .then(todoItem => {
    if (!todoItem) {
      return res.status(404).send({
        message: 'TodoItem Not Found',
      });
    }

    return todoItem
      .destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
}

};
