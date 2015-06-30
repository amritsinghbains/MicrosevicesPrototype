var seneca = require('seneca')()

var product = require('./product')
var sum = require('./sum')

seneca.add( {role:'math', cmd:'sum'}, function(args,callback) {
  sum(args.left, args.right, function(value) {
    callback(null,{answer:value})
  })
})

seneca.add( {role:'math', cmd:'product'}, function(args,callback) {
  product(args.left, args.right, function(value) {
    callback(null,{answer:value})
  })
})
seneca.listen();

function print(err,result) {console.log(result)}


var math = seneca.pin({role:'math',cmd:'*'})
math.sum( {left:1,right:2}, print )
math.product( {left:1,right:2}, print )
