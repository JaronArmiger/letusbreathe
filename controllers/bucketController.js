const bucketUtils = require('../utils/bucket');

exports.get_file = (req, res, next) => {
  res.send('get_file');
}

exports.list = (req, res, next) => {
  res.send('list'); 
}

exports.post_file = (req, res, next) => {
  res.send('post_file');
}