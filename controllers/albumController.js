const Album = require('../models/album');
const Photo = require('../models/photo');
const bucketUtils = require('../utils/bucket');
const { body, validationResult } = require('express-validator');

exports.album_list = async (req, res, next) => {
  await Album.find()
    .then((albums) => {
      
      res.send(albums);
    })
    .catch((err) => {
      return next(err);
    })
};

exports.album_names = async (req, res, next) => {
  await Album.find({}, 'name')
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      return next(err);
    })
}

exports.album_get = async (req, res, next) => {
  try {
  	const album = await Album.findById(req.params.id);
  	const photos = await Photo.find({ 'album': req.params.id });

  	res.send({
  		album, photos
  	})
  } catch(err) {
  	return next(err);
  }
}

exports.album_create = [
  body('name')
    .trim()
    .isAlphanumeric()
    .withMessage('album name can only contain numbers and letters')
    .isLength({ min: 1, max: 30 })
    .withMessage('album name must be 1-30 characters'),
  async (req, res, next) => {
  	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
  	  return res.send(errors);
  	}

  	const album = new Album({
  	  name: req.body.name,
  	});
    album.save()
      .then((event) => res.send(event))
      .catch((err) => next(err))
  }
];

exports.album_delete = async (req, res, next) => {
  const photos = await Photo.find({ 'album': req.params.id }, '_id');
  const deletePhotoPromises = [];
    
  photos.forEach((photo) => {
    deletePhotoPromises.push(bucketUtils.deleteFile(photo._id.toString(), res))
  });
  Promise.all(deletePhotoPromises)
    .then((results) => {
      Album.findByIdAndRemove(req.params.id)
        .then(() => {
          return res.send({ 
            success: true,
            results
          });
        })
        .catch((err) => {
          res.send({ error: err.message });
        });
    })
    .catch((err) => {
      res.send({ error: err.message });
    })
}

