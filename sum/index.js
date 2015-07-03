module.exports = client;

function client(seneca) {
  if(((seneca || {}).constructor || {}).name  !== 'Seneca') {
    return require('./sum')
  }
  return function(left, right, cb) {
    seneca.act( {role:'math', op:'+', left:left, right:right}, cb);
  }
}
