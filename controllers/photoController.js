const Photo = require('../models/photo');

exports.photo_list = async (req, res, next) => {
  await Photo.find()
    .then((photos) => res.send(photos))
    .catch((err) => next(err))
}

exports.photo_create = async (req, res, next) => {
  const photo = new Photo({
  	album: req.body.album,
  });
  photo.save()
    .then((photo) => res.send(photo))
    .catch((err) => next(err))
}