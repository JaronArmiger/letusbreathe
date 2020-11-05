const bucketUtils = require('../utils/bucket');

exports.get_file = (req, res, next) => {
  bucketUtils.getImage(req.params.filename, res)
    .then((img) => {
      let body = bucketUtils.encode(img.Body); 
      let src = 'data:image/jpeg;base64' + body;
      res.send(src);
    })
    .catch((e) => {
      res.send(e);
    });
}

exports.list = async (req, res, next) => {
  bucketUtils.getList(res);
  //res.send(data.Body);
}

exports.post_file = async (req, res, next) => {
  bucketUtils.postFile(req.file.path, req.file.filename, req.body.album, req)
    .then(async (photoId) => {
      res.send({ photoId })
    }, err => {
      next(err);
    });
}

exports.upload_mult = async (req, res, next) => {
  let uploadFilePromises = [];
  req.files.forEach((file) => {
    uploadFilePromises
      .push(bucketUtils.postFile(file.path, file.filename, req.body.album, res));
  })
  Promise.all(uploadFilePromises)
    .then((photoIds) => {
      res.send({ success: true, photoIds })
    })
    .catch((err) => res.send({ error: err.message }))
}

exports.delete_file = async (req, res, next) => {
  bucketUtils.deleteFile(req.params.filename, res);
}