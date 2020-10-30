const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/', eventController.event_list);
router.post('/create', eventController.event_create);
router.get('/:id', eventController.event_get);
router.put('/:id', eventController.event_update);
router.delete('/:id', eventController.event_delete);

module.exports = router;