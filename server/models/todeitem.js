'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('todoitem', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  TodoItem.associate = function(models) {
    //associations can be defined here
    TodoItem.belongsTo(models.todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE'
    });
  };
  return TodoItem;
};
