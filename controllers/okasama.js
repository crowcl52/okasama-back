'use strict'
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lucario55"
  });



function prueba(req,res){
    var id = req.params.id;
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM okasama.employe;", function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({result:result});
            });
        });
};

function states(req,res){
    var id = req.params.id;
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM okasama.state;", function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({result:result});
            });
        });
};

function products(req,res){
    
      con.query("SELECT * FROM okasama.product;", function (err, result, fields) {
        if (err) throw err;
        res.status(200).send({data:result});
      });
}

function editProduct(req,res){
    var id = req.params.id;
    var data = req.body;
    var time = new Date();
    var date = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+(time.getDate());
    console.log(data);
    
    var query = `UPDATE okasama.product SET name='${data.name}', description='${data.description}', discount='${data.discount}', min_price='${data.min_price}', max_price='${data.max_price}', date_update='${date}' WHERE id_product=${id};`;

    // res.status(200).send({data:query});

    con.query(query, function (err, result, fields) {
      if (err) throw err;
      res.status(200).send({data:result.message});
    });
}

function Newproduct(req,res){

    var params = req.body;
    console.log(params)
    res.status(200).send({data:params})

    // con.query("SELECT * FROM okasama.product;", function (err, result, fields) {
    //     if (err) throw err;
    //     res.status(200).send({result:result});
    // });
}

function newUser(req,res){

    var params = req.body;
    console.log(params.email);
    var exist = [];
    con.query("SELECT * FROM okasama.employe where email = '"+params.email+"'", function (err, result, fields) {
        if (err) throw err;
        exist = result;
        if(exist.length > 0){
            res.status(400).send({user:false});
        }else{
            var time = new Date();
            var date = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+(time.getDate());
            var sql =  `INSERT INTO okasama.employe (name, phone, email, address, passwors, type, date_creation, date_update, id_state) VALUES 
                        ('${params.name}', '${params.phone}', '${params.email}', '${params.address}', '${params.password}', '${params.type}', '${date}', '${date}','${params.id_state}') `;
            con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({data:result});
            });
        }
    });

    
}

function login(req,res){

    var params = req.body;
    console.log(params)
    // res.status(200).send({data:params})

    var query =  `SELECT * FROM okasama.employe where email = '${params.email}'`;
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
            res.status(400).send({data:[{message:"error"}]});
        };
        if(result.length > 0){
            if(result[0].passwors == params.password && result[0].email == params.email)
                res.status(200).send({data:result});
            else
                res.status(400).send({data:[{message:"error"}]});
        }else
            res.status(400).send({data:[{message:"error"}]});
        
        
    });
}

function newOrder(req,res){

    var params = req.body;
    var time = new Date();
    var date = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+(time.getDate());
    var sql =  `INSERT INTO okasama.order (id_employe, id_product, quantity, price, pay_date, recive) VALUES 
                (${params.id_employe}, ${params.id_product}, ${params.quantity}, ${params.price}, '${date}', 0) `;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.status(200).send({data:result});
    });
    

    
}

function listOrders(req,res){
    
    var type = req.params.type;
    var id = req.params.id;
    console.log(id);

    if(type == 'admin'){
        con.query("SELECT * FROM okasama.order where recive = 0", function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({data:result});
          });
    }else if(type == 'user' && id != undefined ){
        con.query("SELECT * FROM okasama.order where id_employe = "+id, function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({data:result});
          });
    }else{
        res.status(400).send({data:"error"});
    }
    
}


module.exports = {
    prueba,
    states,
    products,
    editProduct,
    Newproduct,
    newUser,
    login,
    newOrder,
    listOrders
}