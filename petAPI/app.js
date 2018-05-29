var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter=require('./routes/register');
var petshopRouter=require('./routes/petshop');
var petlistRouter=require('./routes/petlist');
var petlistAddRouter=require('./routes/petlistAdd');
var petmessageRouter=require('./routes/petmessage');
var petmessageAddRouter=require('./routes/petmessageAdd');
var articalRouter=require('./routes/artical');
var vaccineAddRouter=require('./routes/vaccineAdd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/petshop',petshopRouter);
app.use('/petlist',petlistRouter);
app.use('/petlistAdd',petlistAddRouter);
app.use('/petmessage',petmessageRouter);
app.use('/petmessageAdd',petmessageAddRouter);
app.use('/artical',articalRouter);
app.use('/vaccineAdd',vaccineAddRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
