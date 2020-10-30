require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const photoController = require('../controllers/photoController');
const Photo = require('../models/photo');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: 'us-east-2',
});
const s3 = new AWS.S3();

const getImage = async (filename, res) => {
  const getParams = {
  	Bucket: process.env.AWS_BUCKET_NAME,
  	Key: filename,
  };

  const data = s3.getObject(getParams).promise();
  return data;
}

const getList = async (res) => {
  const getParams = {
  	Bucket: process.env.AWS_BUCKET_NAME,
  };
  s3.listObjects(getParams, (err, data) => {
    if (err) return res.status(400).send({ success: false, err});
    const keys = data.Contents.map((photo) => {
      return photo.Key;
    })
    return res.send(keys);
  });
}

const postFile = (source, targetName, albumId, res) => {
  console.log('preparing to upload...');
  const photo = new Photo({
    album: albumId,
  });
  photo.save()
    .then((photo) => {
      fs.readFile(source, (err, filedata) => {
        const putParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: photo._id.toString(),
          Body: filedata,
        };
        s3.putObject(putParams, (err, data) => {
          if (err) {
            console.log('Could not upload file: ', err);
            return (null);
          }
          console.log('success!');
          return('nice');
        })
      })
    })
    .catch((err) => next(err))
}

const encode = (data) => {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}

module.exports = {
  getImage,
  getList,
  postFile,
  encode,
}