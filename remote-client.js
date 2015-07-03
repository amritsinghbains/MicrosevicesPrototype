seneca = require('seneca')();

var parse = require('./parser').client();
var sum = require('./sum').client();
var product = require('./product').client();
var evaluate = require('./evaluator')(sum, product).client();
var calculate = require('./calculator')(parse, evaluate).client();

// sum(3,2, log);
// product(3,2, log);
// parse('2+5', function(err, ast) {
//   evaluate(ast, log);
// });
calculate('3+2*(5+1)', log);



function log(err, val) {
  if(err) console.error(err);

  console.log(JSON.stringify(val));
}


// $ node serviceStarter.js  --seneca.log=type:act,regex:role:math  //var evaluateModule = require('./evaluator')(sumModule.direct, productModule.direct);
// 2015-07-02T19:59:09.426Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     IN      7b4xi46vuaga/fddmk2wsfeu2       op:calc,role:math       {role=math,op=calc,expression=3+2*(5+1)}        ENTRY   A;i72ww66i7l1t  -
// 2015-07-02T19:59:09.429Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     IN      lbrk588elxno/r4anzqnehukj       op:parse,role:math      {role=math,op=parse,expression=3+2*(5+1)}       ENTRY   A;m1fxoo3js9cc  -
// 2015-07-02T19:59:09.436Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     OUT     lbrk588elxno/r4anzqnehukj       op:parse,role:math      {cons=Op,children=[{value=+},{cons=Var,children=[{-}]},{cons=Op,children=[{-},{-},{-}]}]}     EXIT     A;m1fxoo3js9cc  7       -
// 2015-07-02T19:59:09.438Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     IN      73qy88kexh6m/l81ynj7ziqwj       op:eval,role:math       {role=math,op=eval,json={cons=Op,children=[{value=+},{cons=Var,children=[-]},{cons=Op,children=[-]}]}} ENTRY   A;0881e8gw9o3g  -
// 2015-07-02T19:59:09.440Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     IN      nz753upyv0te/59wl435kmmzv       op:+,role:math  {role=math,op=+,left=5,right=1} ENTRY   A;03kr05cj53a0  -
// 2015-07-02T19:59:09.443Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     OUT     nz753upyv0te/59wl435kmmzv       op:+,role:math  {result=6}      EXIT    A;03kr05cj53a0  3       -
// 2015-07-02T19:59:09.445Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     IN      2ymq8s2paipo/ichqs76mjb8k       op:*,role:math  {role=math,op=*,left=2,right=6} ENTRY   A;rvthuz7b4f7c  -
// 2015-07-02T19:59:09.446Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     OUT     2ymq8s2paipo/ichqs76mjb8k       op:*,role:math  {result=12}     EXIT    A;rvthuz7b4f7c  2       -
// 2015-07-02T19:59:09.447Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     IN      9edbmtxr8ejo/o2qs40ym2g26       op:+,role:math  {role=math,op=+,left=3,right=12}        ENTRY   A;03kr05cj53a0  -
// 2015-07-02T19:59:09.450Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     OUT     9edbmtxr8ejo/o2qs40ym2g26       op:+,role:math  {result=15}     EXIT    A;03kr05cj53a0  3       -
// 2015-07-02T19:59:09.450Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     OUT     73qy88kexh6m/l81ynj7ziqwj       op:eval,role:math       {result=15}     EXIT    A;0881e8gw9o3g  12      -
// 2015-07-02T19:59:09.450Z        vtxfpl8hc4ly/1435867131239/6518/-       DEBUG   act                     OUT     7b4xi46vuaga/fddmk2wsfeu2       op:calc,role:math       {result=15}     EXIT    A;i72ww66i7l1t  24      -
// $ node serviceStarter.js  --seneca.log=type:act,regex:role:math //var evaluateModule = require('./evaluator')(sumModule.client(), productModule.client();
// 2015-07-02T20:00:35.266Z        ac9wou3n3lb0/1435867231703/6564/-       DEBUG   act                     IN      y0hhbc8mznoz/uk4oppd7pxbu       op:calc,role:math       {role=math,op=calc,expression=3+2*(5+1)}        ENTRY   A;d2x4svc6k0or  -
// 2015-07-02T20:00:35.269Z        ac9wou3n3lb0/1435867231703/6564/-       DEBUG   act                     IN      mfzhfjinqmrm/s3hbkzs1zrgk       op:parse,role:math      {role=math,op=parse,expression=3+2*(5+1)}       ENTRY   A;4nic7h3m7asr  -
// 2015-07-02T20:00:35.276Z        ac9wou3n3lb0/1435867231703/6564/-       DEBUG   act                     OUT     mfzhfjinqmrm/s3hbkzs1zrgk       op:parse,role:math      {cons=Op,children=[{value=+},{cons=Var,children=[{-}]},{cons=Op,children=[{-},{-},{-}]}]}     EXIT     A;4nic7h3m7asr  7       -
// 2015-07-02T20:00:35.277Z        ac9wou3n3lb0/1435867231703/6564/-       DEBUG   act                     IN      gzhn3dvpu24j/qolu2ilk34rb       op:eval,role:math       {role=math,op=eval,json={cons=Op,children=[{value=+},{cons=Var,children=[-]},{cons=Op,children=[-]}]}} ENTRY   A;0y19oqm0uqq8  -
// 2015-07-02T20:00:35.280Z        ac9wou3n3lb0/1435867231703/6564/-       DEBUG   act                     OUT     gzhn3dvpu24j/qolu2ilk34rb       op:eval,role:math       {result=15}     EXIT    A;0y19oqm0uqq8  3       -
// 2015-07-02T20:00:35.280Z        ac9wou3n3lb0/1435867231703/6564/-       DEBUG   act                     OUT     y0hhbc8mznoz/uk4oppd7pxbu       op:calc,role:math       {result=15}     EXIT    A;d2x4svc6k0or  14      -






// zaca@minisuper:~/Development/MicrosevicesPrototype$ node remote-client.js
// 2015-07-02T20:00:35.052Z        m6x20swb6uyh/1435867235035/6569/-       INFO    hello   Seneca/0.6.2/m6x20swb6uyh/1435867235035/6569/-
// 2015-07-02T20:00:35.236Z        m6x20swb6uyh/1435867235035/6569/-       INFO    client  {host=localhost}
// {"result":15}
