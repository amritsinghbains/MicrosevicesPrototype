var name = 'sumService';

module.exports = service;

function service(options) {
  var seneca = this;
  var sum = require('./sum')
  seneca.add( {role:'math', op: '+'}, function(args, callback) {
    sum(args.left, args.right, function(err, value) {
      callback(err,value)
    })
  })
  return {name: name};
}
