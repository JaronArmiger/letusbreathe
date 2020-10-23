const bucketUtils = require('../utils/bucket');

exports.get_file = (req, res, next) => {
  bucketUtils.getImage(req.params.filename, res)
    .then((img) => {
      res.send(img);
    })
    .catch((e) => {
      res.send(e);
    })
}

exports.list = async (req, res, next) => {
  const keys = await bucketUtils.getList(res);
  res.json({ keys });
}

exports.post_file = (req, res, next) => {
  console.log('post_file');
  bucketUtils.postFile(req.file.path, req.file.filename, res);
  res.send({ success: true });
}