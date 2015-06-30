var seneca = require('seneca')();


seneca
.client({host: "localhost"})
.act( {role:'math', cmd:'product', left:3, right:4},
            function(err,result) {
              if( err ) return console.error( err )
              console.log(result)
            })
