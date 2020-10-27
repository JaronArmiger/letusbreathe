const express = require('express');
const router = express.Router();
const multer = require('multer');
const bucketUtils = require('../utils/bucket');

//temp ------------------------
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: 'us-east-2',
});
const s3 = new AWS.S3();
//end temp ---------------------


const storage = multer.diskStorage({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      req.fileValidationError = 'must be jpeg or jpg';
      return cb(null, false, new Error('must be jpeg or jpg'));
    }
    cb(null, true);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

const bucketController = require('../controllers/bucketController');

router.get('/get_file/:filename', bucketController.get_file);
router.get('/list', bucketController.list);
router.post('/post_file', upload.single('photo'),
  bucketController.post_file);


router.post('/upload_mult', upload.array('photos', 12), 
  async (req, res, next) => {
  let uploadFilePromises = [];

  req.files.forEach((file) => {
  	uploadFilePromises
  	  .push(bucketUtils.postFile(file.path, file.filename, res));
  })
  Promise.all(uploadFilePromises)
    .then((results) => {
      res.send({ success: true, results })
    })
    .catch((e) => res.send(e))
})


module.exports = router;