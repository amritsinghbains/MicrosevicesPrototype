module.exports = client;

function client(seneca, clientConfig) {
  if(!seneca) return require('./sum');
  return function(left, right, cb) {
    var senecaSumClient = seneca.client(clientConfig);
    senecaSumClient.act( {role:'math', op:'+', left:left, right:right}, cb);
  }
}
