const Event = require('../models/event');
const { body, validationResult } = require('express-validator');

exports.event_list = async (req, res, next) => {
  try {
    const events = await Event.find().sort('start');
    res.send(events);
  } catch (err) {
    res.status(500).send({ get_error: err.message });
  }
}

exports.create_event = [
/*
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Event must have title')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 1 }).withMessage('Event must have description')
    .escape(),
  */
  async (req, res, next) => {
  	console.log(req.body);
  	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
  	  return res.send(errors);
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