
seneca = require('seneca')();
// var services = process.argv.slice(2);
// services.forEach(function(serviceName) {
//   require('./'+serviceName).startService();
// })




var parserModule = require('./parser');

var sumModule = require('./sum');
var productModule = require('./product');

var evaluateModule = require('./evaluator')(sumModule.client(), productModule.client());
var calculatorModule = require('./calculator')(parserModule.client(), evaluateModule.client());


sumModule.startService();
productModule.startService();
parserModule.startService();

evaluateModule.startService();
calculatorModule.startService();

seneca.listen();
