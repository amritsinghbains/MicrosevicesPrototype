var operations = {};

module.exports = function(sum, product){
  operations['+'] = sum;
  operations['*'] = product;
  return {
    direct: evalJSonAST,
    client: client,
    startService: startService
  }
}

function evalJSonAST(jsonAST, cb) {
  try {
    evaluate(jsonAST, function(value){
        cb(null, {result: value});
    });
  } catch(e) {
    cb({error: e});
  }
}
function evaluate(node, cb) {
  if(node.cons==='Var') {
    cb(Number(node.children[0].value));
  } else if(node.cons==='Op') {
    var op = operations[node.children[0].value];
    var leftNode = node.children[1];
    var rightNode = node.children[2];
    evaluate(leftNode, function(left){
      evaluate(rightNode, function(right){
        op(left, right, function(err, value){
          cb(value.result);
        })
      })
    })
  } else {
    throw new Error("invalid expression");
  }
}


////SENECA interface

function startService() {
//  seneca = seneca || require('seneca')();
  seneca.add( {role:'math', op: 'eval'}, function(args, callback) {
    evalJSonAST(args.json, function(err, value) {
      callback(err,value)
    })
  })
}

function client(clientConfig) {
  return function(json, cb) {
    var senecaClient = seneca.client(clientConfig || {
      host: "localhost"
    });
    senecaClient.act( {role:'math', op:'eval', json:json}, cb);
  }
}
