var name = 'evaluatorService';

module.exports = {
  service: service,
  client: client
}

function service(options) {
  var seneca = this;
  var evaluate = require('./evaluator')(options.sum, options.product);
  seneca.add( {role:'math', op: 'eval'}, function(args, callback) {
    evaluate(args.json, function(err, value) {
      callback(err,value)
    })
  })
  return {name: name};
}

function client(seneca, clientConfig) {
  return function(json, cb) {
    var senecaClient = seneca.client(clientConfig);
    senecaClient.act( {role:'math', op:'eval', json:json}, cb);
  }
}
