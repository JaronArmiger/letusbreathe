const bucketUtils = require('../utils/bucket');

exports.get_file = (req, res, next) => {
  bucketUtils.getImage(req.params.filename, res)
    .then((img) => {
      res.send(img.Body);
    })
    .catch((e) => {
      res.send(e);
    })
}

exports.list = async (req, res, next) => {
  bucketUtils.getList(res);
  //res.send(data.Body);
}

exports.post_file = (req, res, next) => {
  console.log('post_file');
  bucketUtils.postFile(req.file.path, req.file.filename, res);
  res.send({ success: true });
}