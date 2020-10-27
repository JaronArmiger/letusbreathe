const Event = require('../models/event');
const validator = require('express-validator');

exports.event_list = async (req, res, next) => {
  try {
    const events = await Event.find().sort('start', 'descending');
    res.send(events);
  } catch (err) {
    res.status(500).send({ get_error: err.message });
  }
}

exports.create_event = [
  validator
    .body('title', 'Event must have title')
    .trim()
    .isLength({ min: 1 }),
  validator.sanitizeBody('title').escape(),
  validator
    .body('description', 'Event must have description')
    .trim()
    .isLength({ min: 1 }),
  validator.sanitizeBody('description').escape(),
  async (req, res, next) => {
  	const errors = validator.validationResult(req);
  	if (!errors.isEmpty()) {
  	  return res.send({ errors });
  	}
    const event = new Event({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
    });
    try {
      await event.save();
      res.send({ 
      	_id: event._id,
      	title: event.title,
      });
    } catch(err) {
      res.status(500).send({
      	post_error: err.message,
      });
    }
  }
];