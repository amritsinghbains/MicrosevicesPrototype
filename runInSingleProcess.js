
// Corriendo todos los servicios en el mismo proceso, pero
// usando la infraestructura de seneca

var seneca = require('seneca')()



seneca.use('sum/service');
seneca.use('product/service');
seneca.use('parser/service');

var sum = require('./sum')(seneca);
var product = require('./product')(seneca);
seneca.use('evaluator/service', {sum: sum, product: product});

var parse = require('./parser')(seneca);
var evaluate = require('./evaluator')(seneca);
seneca.use('calculator/service', {parse: parse, evaluate: evaluate});

var calculate = require('./calculator')(seneca);

calculate("2+3*(5+1)+9", console.log)

//CONSOLE OUTPUT
// $ node index.js --seneca.log=type:act,regex:role:math
// [TIME]        vf...28/-      DEBUG   act     calculatorService       -       IN      zyvx6eyrp9b3/7ptagmexr91q       op:calc,role:math       {role=math,op=calc,expression=2+3*(5+1)+9}      ENTRY   A;xizvapzl4twl-
// [TIME]        vf...28/-      DEBUG   act     parserService   -       IN      9knk4yslubs4/ocrstb1mk3sw       op:parse,role:math      {role=math,op=parse,expression=2+3*(5+1)+9}     ENTRY   A;zayrs8270z5m  -
// [TIME]        vf...28/-      DEBUG   act     parserService   -       OUT     9knk4yslubs4/ocrstb1mk3sw       op:parse,role:math      {cons=Op,children=[{value=+},{cons=Op,children=[{-},{-},{-}]},{cons=Var,children=[{-}]}]}      EXIT    A;zayrs8270z5m  5       -
// [TIME]        vf...28/-      DEBUG   act     evaluatorService        -       IN      446e75bm74ae/ycb3pxem1tsr       op:eval,role:math       {role=math,op=eval,json={cons=Op,children=[{value=+},{cons=Op,children=[-]},{cons=Var,children=[-]}]}} ENTRY   A;kv75gl78r2sx  -
// [TIME]        vf...28/-      DEBUG   act     sumService      -       IN      58tj53vx5avq/p0limqmgtaio       op:+,role:math  {role=math,op=+,left=5,right=1} ENTRY   A;yk86ope2dimd  -
// [TIME]        vf...28/-      DEBUG   act     sumService      -       OUT     58tj53vx5avq/p0limqmgtaio       op:+,role:math  {result=6}      EXIT    A;yk86ope2dimd  1       -
// [TIME]        vf...28/-      DEBUG   act     productService  -       IN      cjjahzag8qir/ziiqk67yy8sd       op:*,role:math  {role=math,op=*,left=3,right=6} ENTRY   A;bt2szyo5lfh2  -
// [TIME]        vf...28/-      DEBUG   act     productService  -       OUT     cjjahzag8qir/ziiqk67yy8sd       op:*,role:math  {result=18}     EXIT    A;bt2szyo5lfh2  0       -
// [TIME]        vf...28/-      DEBUG   act     sumService      -       IN      r8dt0661jn04/yms8mx98c905       op:+,role:math  {role=math,op=+,left=2,right=18}        ENTRY   A;yk86ope2dimd  -
// [TIME]        vf...28/-      DEBUG   act     sumService      -       OUT     r8dt0661jn04/yms8mx98c905       op:+,role:math  {result=20}     EXIT    A;yk86ope2dimd  1       -
// [TIME]        vf...28/-      DEBUG   act     sumService      -       IN      a2rm4h0wwbv0/fi2pl11jtxd4       op:+,role:math  {role=math,op=+,left=20,right=9}        ENTRY   A;yk86ope2dimd  -
// [TIME]        vf...28/-      DEBUG   act     sumService      -       OUT     a2rm4h0wwbv0/fi2pl11jtxd4       op:+,role:math  {result=29}     EXIT    A;yk86ope2dimd  0       -
// [TIME]        vf...28/-      DEBUG   act     evaluatorService        -       OUT     446e75bm74ae/ycb3pxem1tsr       op:eval,role:math       {result=29}     EXIT    A;kv75gl78r2sx  3       -
// [TIME]        vf...28/-      DEBUG   act     calculatorService       -       OUT     zyvx6eyrp9b3/7ptagmexr91q       op:calc,role:math       {result=29}     EXIT    A;xizvapzl4twl  18      -
// null { result: 29 }
