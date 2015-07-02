module.exports = {
  direct: product,
  client: client,
  startService: startService
}

function product(left, right, cb) {
  var product = left * right
  cb(null, {result: product});
}


////SENECA interface

function startService() {
//  seneca = seneca || require('seneca')();
  seneca.add( {role:'math', op: '*'}, function(args, callback) {
    product(args.left, args.right, function(err, value) {
      callback(err,value)
    })
  })
}

function client(clientConfig) {
  return function(left, right, cb) {
    var senecaClient = seneca.client(clientConfig || {
      host: "localhost"
    });
    senecaClient.act( {role:'math', op:'*', left:left, right:right}, cb);
  }
}
