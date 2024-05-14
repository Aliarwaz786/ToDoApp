var createError = require('http-errors');
var express = require('express');
var path = require('path');

// ORM connectionn
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');

var usersRouter = require('./routes/users');
var taskRouter = require('./routes/tasks');

var app = express();

// Initialize Knex
const knex = Knex(knexConfig);

// Bind Knex instance to Model class
Model.knex(knex);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/', taskRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
