var treehugger = require('treehugger-node');

module.exports = {
    direct: parse,
    client: client,
    startService: startService
}

function parse(expression, cb) {
  var ast = treehugger.parse.parse(expression);
  if(ast.getAnnotation("error")) {
    cb(ast.getAnnotation("error"), undefined);
  } else {
    cb(null, JSON.parse(JSON.stringify(ast[0])));
  }
}



////SENECA interface

function startService() {
  seneca.add( {role:'math', op: 'parse'}, function(args, callback) {
    parse(args.expression, function(err, value) {
      callback(err,value)
    })
  })
}

function client(clientConfig) {
  return function(expression, cb) {
    var senecaClient = seneca.client( clientConfig || {
      host: "localhost"
    });
    senecaClient.act( {role:'math', op:'parse', expression:expression}, cb);
  }
}
