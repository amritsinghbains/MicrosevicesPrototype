module.exports = function(seneca) {
  //options object passed directlty to evaluator
  if(((seneca || {}).constructor || {}).name  !== 'Seneca') {
    return require('./evaluator')(seneca); //options object passet to evaluator
  } else {
    return function(json, cb) {
      seneca.act({role: 'math', op: 'eval', json: json}, cb);
    }
  }
}
