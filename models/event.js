const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const EventSchema = new Schema({
  title: { 
    type: String, 
    require: true, 
    maxLength: 100
  },
  start: { 
  	type: Date,
  	require: true,
   },
  end: { 
  	type: Date,
  	require: true,
  },
  description: {
  	type: String,
  	require: true,
  },
  photo: {type: Schema.Types.ObjectId, ref: 'Photo'},
});

module.exports = mongoose.model('Event', EventSchema);