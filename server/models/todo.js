'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
     timestamps: false,
     freezeTableName: true
  });
  Todo.associate = function(models) {
    //associations can be defined here
    Todo.hasMany(models.todoitem,{
      foreignKey: 'todoId',
      as: 'todoItems'
    });
  };
  return Todo;
};
