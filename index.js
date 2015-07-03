var seneca = require('seneca')()

var parserSeneca = require('./parser-seneca');
var evaluatorSeneca = require('./evaluator-seneca');

seneca.use('sum/service');
seneca.use('product/service');

var sum = require('./sum/client')(seneca);
var product = require('./product/client')(seneca);

sum(2,5, console.log);
product(2,5, console.log);

seneca.act({role:'math', op:'+', left:2, right:9}, console.log)
