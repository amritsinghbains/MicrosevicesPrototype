module.exports = {
    direct: sum,
    client: client,
    startService: startService
}

function sum(left, right, cb) {
  var sum = left + right
  cb(null, {result: sum});
}


////SENECA interface

function startService() {
  seneca.add( {role:'math', op: '+'}, function(args, callback) {
    sum(args.left, args.right, function(err, value) {
      callback(err,value)
    })
  })
}

function client(clientConfig) {
  return function(left, right, cb) {
    var senecaSumClient = seneca.client(clientConfig || {
      host: "localhost"
    });
    senecaSumClient.act( {role:'math', op:'+', left:left, right:right}, cb);
  }
}
