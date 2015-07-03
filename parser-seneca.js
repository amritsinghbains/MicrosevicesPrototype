
var senecaName = "parserService";

module.exports = {
    client: client,
    service: service
}


////SENECA interface

function service(options) {
  var seneca = this;
  var parse = require('./parser');
  seneca.add( {role:'math', op: 'parse'}, function(args, callback) {
    parse(args.expression, function(err, value) {
      callback(err,value)
    })
  })
  return {name: senecaName};
}

function client(seneca, clientConfig) {
  return function(expression, cb) {
    var senecaClient = seneca.client(clientConfig);
    senecaClient.act( {role:'math', op:'parse', expression:expression}, cb);
  }
}
