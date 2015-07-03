var name = 'calculatorService';
module.exports = function(options) {
  var seneca = this;
  var calculate = require('./calculator')(options);
  seneca.add({role: 'math', op: 'calc'}, function(args, callback) {
    calculate(args.expression, function(err, value) {
      callback(err, value)
    })
  });
  return { name: name };
}
