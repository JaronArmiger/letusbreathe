var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AWS = require('aws-sdk');
//const multer = require('multer');
const fs = require('fs');

require('./database');

const apiRouter = require('./routes/api');
const bucketRouter = require('./routes/bucket');

var app = express();

/*
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
*/

//const upload = multer({ storage });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));


/*
app.post('/post_file', upload.single('demo_file'), (req, res) => {
  uploadFile(req.file.path, req.file.filename, res);
})
 
app.get('/get_file/:filename', (req, res) => {
  getImage(req.params.filename, res)
    .then((img) => {
      let image = "<img src='data:image/jpeg;base64," +
        encode(img.Body) + "'" + "/>";
      res.send(img);
    })
    .catch((e) => {
      res.send(e);
    })
});
*/

app.use('/api', apiRouter);
app.use('/bucket', bucketRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;
/*
const uploadFile = (source, targetName, res) => {
  console.log('preparing to upload...');
  fs.readFile(source, (err, filedata) => {
  	const putParams = {
  	  Bucket: process.env.AWS_BUCKET_NAME,
  	  Key: targetName,
  	  Body: filedata,
  	};
  	s3.putObject(putParams, (err, data) => {
  	  if (err) {
  	    console.log('Could not upload file: ', err);
  	    return res.send({ err });
  	  }
  	  console.log('success!');
  	  return res.send({ success: true });
  	})
  })
}

const getImage = async (filename, res) => {
  const getParams = {
  	Bucket: process.env.AWS_BUCKET_NAME,
  	Key: filename,
  };

  const data = s3.getObject(getParams).promise();
  return data;
}
*/
/*
const encode = (data) => {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}
*/