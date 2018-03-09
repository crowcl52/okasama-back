'use strict'


var port = process.env.PORT || 3678;

var app = require('./app');
  
app.listen(port, ()=>{
    console.log(`Servidor Okasama en http://localhost:${port}`);
    
});