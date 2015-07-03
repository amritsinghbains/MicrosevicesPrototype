
var senecaName = "parserService";

module.exports = function(options) {
  var seneca = this;
  var parse = require('./parser');
  seneca.add( {role:'math', op: 'parse'}, function(args, callback) {
    parse(args.expression, function(err, value) {
      callback(err,value)
    })
  })
  return {name: senecaName};
}
