'use strict'

var express = require('express');
var body = require('body-parser');


var app = express();
var api = require('./routes/okasama');


app.use(body.urlencoded({extended:false}));
app.use(body.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET','POST','OPTIONS',"PUT",'DELETE');
    res.header("Allow", 'GET','POST','OPTIONS','PUT','DELETE');

    next();

});
app.use('/api',api);



module.exports = app;