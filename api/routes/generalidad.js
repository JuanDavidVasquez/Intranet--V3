'use strict'

const multipart = require('connect-multiparty');
var express = require('express');
var GeneralidadController = require('../controllers/generalidad');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multiparty = multipart({uploadDir:'./uploads/generalidad'});

api.get('/generalidad', GeneralidadController.generalidad);
api.post('/register-generalidad', md_auth.ensurreAuth, GeneralidadController.saveGeneralidad);
api.get('/generalidad/:id', md_auth.ensurreAuth, GeneralidadController.getGeneralidad);
api.get('/generalidad-user/:id', md_auth.ensurreAuth, GeneralidadController.getGeneralidadUser);
api.get('/generalidad-users', md_auth.ensurreAuth, GeneralidadController.getGeneralidads);
api.put('/update-generalidad/:id', md_auth.ensurreAuth, GeneralidadController.updateGeneralidad);

module.exports = api;