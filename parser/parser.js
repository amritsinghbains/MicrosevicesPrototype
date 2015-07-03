var treehugger = require('treehugger-node');

module.exports = parse;

function parse(expression, cb) {
  var ast = treehugger.parse.parse(expression);
  if(ast.getAnnotation("error")) {
    cb(ast.getAnnotation("error"), undefined);
  } else {
    cb(null, JSON.parse(JSON.stringify(ast[0])));
  }
}
