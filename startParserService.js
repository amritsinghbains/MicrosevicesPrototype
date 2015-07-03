
// Corriendo solamente parser service,
// escuchando peticiones en puerto : port

var seneca = require('seneca')()

var argv = require('yargs').argv;

seneca.use('parser/service');

seneca.listen(argv.port || 10102)


// $ node startAllServices.js --seneca.log=type:act,regex:role:math
//
//// $ curl -d '{"role" : "math", "op": "calc", "expression": "2+2"}' http://localhost:10101/act
////{"result":4}

// 2015-07-03T19:03:26.457Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     calculatorService       -       IN      ka2l32vtdjcc                    op:calc,role:math       {role=math,op=calc,expression=2+2}      ENTRY   A;0n8manef68ox  -
// 2015-07-03T19:03:26.459Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     parserService           -       IN      xjm54hjwvn7f/uhkngcqg3j1j       op:parse,role:math      {role=math,op=parse,expression=2+2}     ENTRY   A;qujkf6akbefm  -
// 2015-07-03T19:03:26.465Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     parserService           -       OUT     xjm54hjwvn7f/uhkngcqg3j1j       op:parse,role:math      {cons=Op,children=[{value=+},{cons=Var,children=[{-}]},{cons=Var,children=[{-}]}]}     EXIT    A;qujkf6akbefm  6       -
// 2015-07-03T19:03:26.465Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     evaluatorService        -       IN      8drpphnfwdtk/m0fl6p2ymux1       op:eval,role:math       {role=math,op=eval,json={cons=Op,children=[{value=+},{cons=Var,children=[-]},{cons=Var,children=[-]}]}}        ENTRY   A;9uw1bgag14xc  -
// 2015-07-03T19:03:26.466Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     sumService              -       IN      hfmhd9pi9qon/pml3izpan5ro       op:+,role:math          {role=math,op=+,left=2,right=2} ENTRY   A;6g5bzo4tiezg  -
// 2015-07-03T19:03:26.466Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     sumService              -       OUT     hfmhd9pi9qon/pml3izpan5ro       op:+,role:math          {result=4}      EXIT    A;6g5bzo4tiezg  0       -
// 2015-07-03T19:03:26.467Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     evaluatorService        -       OUT     8drpphnfwdtk/m0fl6p2ymux1       op:eval,role:math       {result=4}      EXIT    A;9uw1bgag14xc  1       -
// 2015-07-03T19:03:26.467Z        60cf4phllfd6/1435950196630/11280/-      DEBUG   act     calculatorService       -       OUT     ka2l32vtdjcc                    op:calc,role:math       {result=4}      EXIT    A;0n8manef68ox  10      -
