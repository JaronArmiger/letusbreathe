const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/', eventController.event_list);
router.post('/create', eventController.create_event);

module.exports = router;