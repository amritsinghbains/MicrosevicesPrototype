module.exports = product;


function product(left, right, cb) {
  var product = left * right
  cb(null, {result: product});
}
