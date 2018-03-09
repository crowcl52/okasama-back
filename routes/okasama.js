'use strict'

var express = require('express');
var okasamaController = require('../controllers/okasama');

var api = express.Router();

api.get('/prueba/:id?', okasamaController.prueba);
api.get('/state', okasamaController.states);
api.get('/products', okasamaController.products);
api.post('/edit-product/:id', okasamaController.editProduct);
api.post('/products', okasamaController.Newproduct);
api.post('/register', okasamaController.newUser);
api.post('/login', okasamaController.login);
api.post('/order', okasamaController.newOrder);
api.get('/order/:type/:id?', okasamaController.listOrders);


module.exports = api;