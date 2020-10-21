const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

const bucketController = require('../controllers/bucketController');

router.get('/get_file/:filename', bucketController.get_file);
router.get('/list', bucketController.list);
router.post('/post_file', upload.single('file'),
  bucketController.post_file);

module.exports = router;