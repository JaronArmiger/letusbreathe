const Event = require('../models/event');
const { body, validationResult } = require('express-validator');

exports.event_list = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (err) {
    res.status(500).send({ get_error: err.message });
  }
}

exports.event_get = async (req, res, next) => {
  Event.findById(req.params.id)
    .then((event) => res.send(event))
    .catch((err) => res.send(err));
}

exports.event_create = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Event must have title'),
  body('description')
    .trim()
    .isLength({ min: 1 }).withMessage('Event must have description'),
  body('start')
    .custom((value, { req }) => {
      const startDate = new Date(value);
      const endDate = new Date(req.body.end);
      if (startDate >= endDate) {
        throw new Error('End Date/Time must be after start Date/Time')
      }
      return true;
    }),
  async (req, res, next) => {
  	//console.log(req.body);
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
      	event
      });
    } catch(err) {
      res.status(500).send({
      	post_error: err.message,
      });
    }
  }
];

exports.event_delete = async (req, res, next) => {
    Event.findByIdAndRemove(req.params.id)
      .then(() => res.send({ success: true }))
      .catch((err) => {
        res.status(500).send({ 
          delete_error: err.message,
          success: false,
        })
      });
}

exports.event_update = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Event must have title'),
  body('description')
    .trim()
    .isLength({ min: 1 }).withMessage('Event must have description'),
  body('start')
    .custom((value, { req }) => {
      const startDate = new Date(value);
      const endDate = new Date(req.body.end);
      if (startDate >= endDate) {
        throw new Error('End Date/Time must be after start Date/Time')
      }
      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors);
    }

    const event = new Event({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
    })

    Event.findByIdAndUpdate(req.params.id, event, {})
      .then(() => res.send(event))
      .catch((err) => {
        res.status(500).send({ 
          update_error: err.message,
          success: false,
        })
      });
  }
];