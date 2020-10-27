var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./database');

const apiRouter = require('./routes/api');
const bucketRouter = require('./routes/bucket');
const eventsRouter = require('./routes/events');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', apiRouter);
app.use('/bucket', bucketRouter);
app.use('/events', eventsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;