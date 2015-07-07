var seneca = require('seneca')();
seneca.use('redis-transport');
// seneca.use('loadbalance-transport', {
//   workers: [
//     {type: 'web', port: 10102},
//     {type: 'web', port: 10103},
//   ]
// });

var argv = require('yargs')
  .usage('Usage: node startService.js <--all|[command]>')
  .command('sum', 'start sum service')
  .command('product', 'start product service')
  .command('calculator', 'start calculator service')
  .option('parser_client', {
      demand: true,
      alias: 'pc',
      default: 'local',
      description: 'parser client configuration',
    })
  .option('evaluator_client', {
      demand: true,
      alias: 'ec',
      default: 'local',
      description: 'evaluator client configuration',
    })
  .example('calculator -pc {"host": "localhost", "port": "10102"}', 'start the calculator serivice\n'+
                              'using the parser deployed in localhost port 10102 using seneca web transport\n'+
                              'with a local evaluator')
  .command('evaluator', 'start evaluator service')
  .option('sum_client', {
      demand: true,
      alias: 'sc',
      default: 'local',
      description: 'sum client configuration',
    })
  .option('product_client', {
      demand: true,
      alias: 'pc',
      default: 'local',
      description: 'product client configuration',
    })
  .example('evaluator -sc {"host": "localhost", "port": "10102"}', 'start the evaluator service\n'+
                              'using the sum service deployed in localhost port 10102 using seneca web transport\n'+
                              'with a local product service')
  .alias('a', 'all')
  .describe('all', 'start all services')
  .option('l', {
    alias: 'listen',
    default: '{"port": 10101}',
    demand: true,
    describe: 'transport listen configuation',
    type: 'string'
  })
  .help('help')
  .alias('h', 'help')
  .argv;

var services = argv._

if(services.indexOf('sum')>=0 || argv.all) {
  console.log('starting sum service')
  seneca.use('sum/service');
}
if(services.indexOf('product')>=0 || argv.all) {
  console.log('starting product service')
  seneca.use('product/service');
}

if(services.indexOf('parser')>=0 || argv.all) {
  console.log('starting parser service')
  seneca.use('parser/service');
  // seneca.add({ role: 'transport', cmd: 'ping' }, function (args, cb) {
  // // Silence errors about endpoint not found.
  // cb()
})

}



if(services.indexOf('evaluator')>=0 || argv.all) {
  console.log('starting evaluator service')
  var sum = getClienConfiguration('sum', argv.sum_client);
  var product = getClienConfiguration('product', argv.product_client);
  seneca.use('evaluator/service', {sum: sum, product: product});
}


if(services.indexOf('calculator')>=0 || argv.all) {
  console.log('starting calculator service')
  var parse = getClienConfiguration('parser', argv.parser_client);
  var evaluate = getClienConfiguration('evaluator', argv.evaluator_client);
  seneca.use('calculator/service', {parse: parse, evaluate: evaluate});
}



var listenConfiguration = argv.listen ? JSON.parse(argv.listen) : {"port": 10101};
seneca.listen(listenConfiguration);
console.log("listen configuration : %s", JSON.stringify(listenConfiguration));


function getClienConfiguration(serviceName, configuration, dependencies) {
  var service = require('./'+serviceName)
  if(configuration=='local') {
    console.log('using %s local configuration', serviceName);
    seneca.use(serviceName+'/service', dependencies);
    return service(seneca);
  } else {
    var config = JSON.parse(configuration);
    config.pin = require('./'+serviceName+'/pattern.json');
    return service(seneca.client(config));
  }
}
// Using web transport to connect to parser:
// $ node startService.js parser -l '{"port":10102}'  --seneca.log=type:act,regex:role:math
// $ node startService.js evaluator calculator --parser_client='{"host":"localhost", "port":10102}'  --seneca.log=type:act,regex:role:math
//
// $ curl -d '{"role" : "math", "op": "calc", "expression": "2+2"}' http://localhost:10101/act
// {"result":4}


// Using redis transport to connect to parser: (npm install seneca-redis-transport)
//  $node startService.js evaluator calculator --parser_client='{"type":"redis"}' --seneca.log=type:act,regex:role:math
//  $node startService.js parser -l '{"type":"redis", "pin":"{\"role\":\"math\", \"op\":\"parse\"}"}'  --seneca.log=plugin:redis-transport




//Using loadbalance-transport -> uncomment load balance lines
// $node startService.js parser -l '{"port":10102}'  --seneca.log=type:act,regex:role:math
// $node startService.js parser -l '{"port":10103}'  --seneca.log=type:act,regex:role:math
// $node startService.js evaluator calculator --parser_client='{"type":"loadbalance-transport"}'  --seneca.log=type:act,regex:rolmath
