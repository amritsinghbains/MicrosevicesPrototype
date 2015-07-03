module.exports = function(seneca, options) {
  if (seneca.constructor === Object) {
    return require('./calculator')(seneca); //options object passet to evaluator
  } else {
    return function(expression, cb) {
      var senecaSumClient = seneca.client(options);
      senecaSumClient.act({role: 'math', op: 'calc', expression: expression}, cb);
    }
  }
}
