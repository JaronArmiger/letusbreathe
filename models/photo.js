const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  album: {type: Schema.Types.ObjectId, ref: 'Album'},
  }, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updatedAt',
  }
});

module.exports= mongoose.model('Photo', PhotoSchema);