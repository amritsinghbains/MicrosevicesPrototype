module.exports = function (seneca, clientConfig) {
  if(!seneca) return require('./parser');
  return function(expression, cb) {
    var senecaClient = seneca.client(clientConfig);
    senecaClient.act( {role:'math', op:'parse', expression:expression}, cb);
  }
}
