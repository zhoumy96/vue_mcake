const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const ejs = require('ejs');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const goodsRouter = require('./routes/goods');
const newsRouter = require('./routes/news');

const app = express();
//
// // 请求头 chorme cors协议
// const allowCors = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials','true');
//   next();
// };
// app.use(allowCors);
app.use(require('cors')());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/goods', goodsRouter);
app.use('/news', newsRouter);

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
