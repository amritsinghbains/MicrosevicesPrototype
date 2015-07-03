
// Corriendo todos los servicios en el mismo proceso,
// exepto parser... que debe especificarse por parametro

var seneca = require('seneca')()

var argv = require('yargs').argv;


var parserClientConfig = JSON.parse(argv.parser);

seneca.use('sum/service');
seneca.use('product/service');

var sum = require('./sum')(seneca);
var product = require('./product')(seneca);
seneca.use('evaluator/service', {sum: sum, product: product});

var parse = require('./parser')(seneca.client(parserClientConfig));
var evaluate = require('./evaluator')(seneca);
seneca.use('calculator/service', {parse: parse, evaluate: evaluate});

var calculate = require('./calculator')(seneca);

seneca.listen(argv.port || 10101)

//$ node startParserService.js --port 10102 --seneca.log=type:act,regex:role:math
//$ node startAllButParser.js --parser='{"host":"localhost", "port":10102}' --seneca.log=type:act,regex:role:math



///web client
// $ curl -d '{"role" : "math", "op": "calc", "expression": "2+2"}' http://localhost:10101/act
// {"result":4}
