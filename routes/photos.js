const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

router.get('/', photoController.photo_list);
router.post('/', photoController.photo_create);

module.exports = router;