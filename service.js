var seneca = require('seneca')()
var services = process.argv.slice(2);
services.forEach(function(serviceName) {
  seneca.add( {role:'math', cmd: serviceName}, function(args, callback) {
    var service = require('./'+serviceName);
    service(args.left, args.right, function(value) {
      callback(null,{answer:value})
    })
  })
})
seneca.listen();
