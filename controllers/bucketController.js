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
    })
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

exports.delete_file = async (req, res, next) => {
  bucketUtils.deleteFile(req.params.filename, res);
}