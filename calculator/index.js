module.exports = function(seneca) {
  if(((seneca || {}).constructor || {}).name  !== 'Seneca') {
    return require('./calculator')(seneca); //options object passed to calculator
  } else {
    return function(expression, cb) {
      seneca.act({role: 'math', op: 'calc', expression: expression}, cb);
    }
  }
}
