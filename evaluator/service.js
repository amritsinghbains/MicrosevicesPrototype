var name = 'evaluatorService';

module.exports = function(operations) {
  var seneca = this;
  var evaluate = require('./evaluator')(operations);
  seneca.add( {role:'math', op: 'eval'}, function(args, callback) {
    evaluate(args.json, function(err, value) {
      callback(err,value)
    })
  })
  return {name: name};
}
