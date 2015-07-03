var name = 'productService';

module.exports = client;

function client(seneca) {
  if(((seneca || {}).constructor || {}).name  !== 'Seneca') {
    return require('./product')
  }
  return function(left, right, cb) {
    seneca.act( {role:'math', op:'*', left:left, right:right}, cb);
  }
}
