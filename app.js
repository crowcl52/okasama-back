'use strict'

var express = require('express');
var body = require('body-parser');


var app = express();
var api = require('./routes/okasama');


app.use(body.urlencoded({extended:false}));
app.use(body.json());
app.use('/api',api);



module.exports = app;