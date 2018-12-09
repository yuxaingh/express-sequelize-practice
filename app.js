const express  = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);

app.get('/*', function(req, res){
  return res.status(200).send({
    message: 'Welcome to the first nothingness.'
  });
});

module.exports = app;
