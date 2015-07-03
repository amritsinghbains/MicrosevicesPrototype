module.exports = function(seneca, options) {
  //options object passed directlty to evaluator
  if (seneca.constructor === Object) {
    return require('./evaluator')(seneca); //options object passet to evaluator
  } else {
    return function(json, cb) {
      var senecaClient = seneca.client(options);
      senecaClient.act({role: 'math', op: 'eval', json: json}, cb);
    }
  }
}
