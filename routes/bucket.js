const express = require('express');
const router = express.Router();

const bucketController = require('../controllers/bucketController');

router.get('get_file/:filename', bucketController.get_file);
router.get('list', bucketController.list);
router.post('post_file', bucketController.post_file);