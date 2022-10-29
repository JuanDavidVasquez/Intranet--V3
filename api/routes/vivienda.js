'use strict'

const multipart = require('connect-multiparty');
var express = require('express');
var ViviendaController = require('../controllers/vivienda');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multiparty = multipart({uploadDir:'./uploads/vivienda'});

api.get('/vivienda', ViviendaController.vivienda);
api.post('/register-vivienda', md_auth.ensurreAuth, ViviendaController.saveVivienda);
api.get('/vivienda/:id', md_auth.ensurreAuth, ViviendaController.getVivienda);
api.get('/vivienda-user/:id', md_auth.ensurreAuth, ViviendaController.getViviendaUser);
api.get('/vivienda-users', md_auth.ensurreAuth, ViviendaController.getViviendas);
api.put('/update-vivienda/:id', md_auth.ensurreAuth, ViviendaController.updateVivienda);

module.exports = api;