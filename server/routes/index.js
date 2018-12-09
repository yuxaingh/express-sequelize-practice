const todosController = require('../controllers').todos;
const todosItemController = require('../controllers').todoItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({message: 'Welcome to the Tode List API!'}));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.post('/api/todos/:todoId/items', todosItemController.create);
  app.get('/api/todos/:todoId', todosController.retrive);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);
  app.put('/api/todos/:todoId/items/:todoItemId', todosItemController.update);
  app.delete('/api/todos/:todoId/items/:todoItemId', todosItemController.destroy);
};
