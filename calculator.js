var parse = undefined;
var evaluate = undefined;


module.exports = function(parseFunction, evaluateFunction){
  parse = parseFunction;
  evaluate = evaluateFunction;
  return {
    direct: calculate,
    client: client,
    startService: startService
  }
}

function calculate(expression, cb) {
  parse(expression, function(err, astStr) {
    evaluate(astStr, function(err, result) {
      cb(err, result);
    });
  });
}


////SENECA interface

function startService() {
  seneca.add( {role:'math', op: 'calc'}, function(args, callback) {
    calculate(args.expression, function(err, value) {
      callback(err,value)
    })
  })
}

function client(clientConfig) {
  return function(expression, cb) {
    var senecaSumClient = seneca.client(clientConfig || {
      host: "localhost"
    });
    senecaSumClient.act( {role:'math', op:'calc', expression:expression}, cb);
  }
}
