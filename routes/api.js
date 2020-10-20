var express = require('express');
var router = express.Router();

const passwordsController = require('../controllers/passwordsController');
/* GET users listing. */
router.get('/passwords', passwordsController.getPasswords);

module.exports = router;
