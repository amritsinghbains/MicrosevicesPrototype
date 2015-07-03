var seneca = require('seneca')()



seneca.use('sum/service');
seneca.use('product/service');
seneca.use('parser/service');

var sum = require('./sum')(seneca);
var product = require('./product')(seneca);
seneca.use('evaluator/service', {sum: sum, product: product});
var parse = require('./parser')(seneca);
var evaluate = require('./evaluator')(seneca);

seneca.use('calculator/service', {parse: parse, evaluate: evaluate});

var calculate = require('./calculator')(seneca);

calculate("2+3*(5+1)+9", console.log)
