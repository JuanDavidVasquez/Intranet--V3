'use strict'

var express = require('express');
var PiezaGraficaOfertaController = require('../controllers/piezaGraficaOferta');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/piezaGraficaOferta'});

api.post('/register-piezaGraficaOferta',PiezaGraficaOfertaController.savePiezaGraficaOferta);
api.get('/piezaGraficaOferta/:id', PiezaGraficaOfertaController.getPiezaGraficaOferta);
api.get('/piezaGraficaOfertas', PiezaGraficaOfertaController.getPiezaGraficaOfertas);
api.put('/update-piezaGraficaOferta/:id',PiezaGraficaOfertaController.updatePiezaGraficaOferta);
api.get('/search-piezaGraficaOferta/:search', PiezaGraficaOfertaController.searchPiezaGraficaOferta);


module.exports = api;