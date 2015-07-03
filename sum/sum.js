module.exports = function(left, right, cb) {
  var sum = left + right
  cb(null, {result: sum});
}
