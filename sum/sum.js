module.exports = sum

function sum(left, right, cb) {
  var sum = left + right
  cb(null, {result: sum});
}
