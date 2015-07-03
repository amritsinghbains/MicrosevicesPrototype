
module.exports = function(options) {
  var parse = options.parse;
  var evaluate = options.evaluate;

  return function(expression, cb) {
    parse(expression, function(err, ast) {
      evaluate(ast, function(err, result) {
        cb(err, result);
      });
    });
  }
}
