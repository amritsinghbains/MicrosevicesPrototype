module.exports = function(options) {
  var operations = {};
  operations['+'] = options.sum;
  operations['*'] = options.product;
  var evaluate = function(node, cb) {
    if (node.cons === 'Var') {
      cb(Number(node.children[0].value));
    } else if (node.cons === 'Op') {
      var op = operations[node.children[0].value];
      var leftNode = node.children[1];
      var rightNode = node.children[2];
      evaluate(leftNode, function(left) {
        evaluate(rightNode, function(right) {
          op(left, right, function(err, value) {
            cb(value.result);
          })
        })
      })
    } else {
      throw new Error("invalid expression");
    }
  }

  return function(ast, cb) {
    try {
      evaluate(ast, function(value) {
        cb(null, {result: value});
      });
    } catch (e) {
      cb({error: e });
    }

  }

}
