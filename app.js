var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AWS = require('aws-sdk');

require('./database');

var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: 'us-east-2',
});
const s3 = new AWS.S3();

app.get('/get_file/:filename', (req, res) => {
  getImage(req.params.filename, res)
    .then((img) => {
      let image = "<img src='data:image/jpeg;base64," +
        encode(img.Body) + "'" + "/>";
      res.send(image);
    })
    .catch((e) => {
      res.send(e);
    })
})
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;

const getImage = async (filename, res) => {
  const getParams = {
  	Bucket: process.env.AWS_BUCKET_NAME,
  	Key: filename,
  };

  const data = s3.getObject(getParams).promise();
  return data;
}

const encode = (data) => {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}