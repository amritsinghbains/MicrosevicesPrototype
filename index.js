
var parse = require('./parser').direct
var evaluate = require('./evaluator').direct
//var treehugger = require('treehugger-node');

parse("2+3*(3+2)", function(err, node) {
   evaluate(node, function(err, value) {
     console.log(value);
   });

  // node.traverseTopDown(
  //  'Op(op, Var(left), Var(right))', function(n) {
  //       var value = eval(n.left.value + " "+ n.op.value+ " "+ n.right.value);
  //       n.op.result = value;
  //       n.op.transverseUp()
  //  });
  //
})
parse("2", function(err, node) {
  evaluate(node, function(err, value) {
    console.log(value);
  });
})
