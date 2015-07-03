module.exports = function (seneca) {
  if(((seneca || {}).constructor || {}).name  !== 'Seneca') {
    return require('./parser')
  }
  return function(expression, cb) {
    seneca.act( {role:'math', op:'parse', expression:expression}, cb);
  }
}
