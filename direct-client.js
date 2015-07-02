var parse = require('./parser').direct;
var sum = require('./sum').direct;
var product = require('./product').direct;
var evaluate = require('./evaluator')(sum, product).direct;
var calculate = require('./calculator')(parse, evaluate).direct;


sum(3,2, log);
product(3,2, log);
parse('2+5', function(err, astStr) {
  evaluate(astStr, log);
});
calculate('3+2*(5+1)', log);

// CONSOLE OUTPUT
// $ node direct-client.js
// {"result":5}
// {"result":6}
// {"result":7}
// {"result":15}






function log(err, val) {
  if(err) console.error(err);

  console.log(JSON.stringify(val));
}
