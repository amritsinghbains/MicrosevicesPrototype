var name = 'productService';

module.exports = client;

function client(seneca, clientConfig) {
  if(!seneca) return require('./product');
  return function(left, right, cb) {
    var senecaClient = seneca.client(clientConfig || {
      host: "localhost"
    });
    senecaClient.act( {role:'math', op:'*', left:left, right:right}, cb);
  }
}
