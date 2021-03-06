var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var auth = require('./routes/auth');
var mongoose = require('mongoose');


// Connect to MongoDB
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/twinship', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


var twinship = require('./routes/twinship');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/twinships', express.static(path.join(__dirname, 'dist')));
app.use('/twinship', twinship);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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