const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://kaqkuimn:E30lEAnzM-qzKJgaKcPWlbyCqMG_Hxoh@baasu.db.elephantsql.com:5432/kaqkuimn');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
