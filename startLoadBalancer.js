var seneca = require('seneca')();
var argv = require('yargs').argv;

var workers = JSON.parse(argv.workers)

seneca.use('loadbalance-transport', {
    workers: workers
});


seneca.client({ type: 'loadbalance-transport' })
  .listen(argv.port)


// $ node startService.js parser -l '{"port":10102}'  --seneca.log=type:act,regex:role:math
// $ node startService.js parser -l '{"port":10103}'  --seneca.log=type:act,regex:role:math
// $ node startLoadBalancer.js --port 10109 --workers='[{"port":10102},{"port":10103}]'
// $ node startService.js evaluator calculator --parser_client='{"port":10109}'  --seneca.log=type:act,regex:rolmath

//web client
//curl -d '{"role" : "math", "op": "calc", "expression": "2+2"}' http://localhost:10101/act
//{"result":4}
