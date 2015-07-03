var name = 'productService';

module.exports = service

function service(options) {
  var seneca = this;
  var product = require('./product')
  seneca.add( {role:'math', op: '*'}, function(args, callback) {
    product(args.left, args.right, function(err, value) {
      callback(err,value)
    })
  })
  return {name: name};
}
