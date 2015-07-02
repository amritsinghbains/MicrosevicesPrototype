seneca = require('seneca')();

var parse = require('./parser').client();
var sum = require('./sum').client();
var product = require('./product').client();
var evaluate = require('./evaluator')(sum, product).client();
var calculate = require('./calculator')(parse, evaluate).client();

sum(3,2, log);
product(3,2, log);
parse('2+5', function(err, ast) {
  evaluate(ast, log);
});
calculate('3+2*(5+1)', log);

// $ node serviceStarter.js
// 2015-07-02T12:17:58.997Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    hello   Seneca/0.6.2/pqsjsz2z4olq/1435839478980/11388/-
// 2015-07-02T12:17:59.243Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    listen
// 2015-07-02T12:18:03.914Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.919Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.922Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.925Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.928Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.930Z        pqsjsz2z4olq/1435839478980/11388/-      INFO    client  {host=localhost}
//


// $ node remote-client.js
// 2015-07-02T12:18:03.609Z        0mgy90d4fbuh/1435839483593/11660/-      INFO    hello   Seneca/0.6.2/0mgy90d4fbuh/1435839483593/11660/-
// 2015-07-02T12:18:03.858Z        0mgy90d4fbuh/1435839483593/11660/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.861Z        0mgy90d4fbuh/1435839483593/11660/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.862Z        0mgy90d4fbuh/1435839483593/11660/-      INFO    client  {host=localhost}
// 2015-07-02T12:18:03.863Z        0mgy90d4fbuh/1435839483593/11660/-      INFO    client  {host=localhost}
// {"result":5}
// {"result":6}
// 2015-07-02T12:18:03.915Z        0mgy90d4fbuh/1435839483593/11660/-      INFO    client  {host=localhost}
// {"result":7}
// {"result":15}



function log(err, val) {
  if(err) console.error(err);

  console.log(JSON.stringify(val));
}
