'use strict'

var express = require('express');
var PerfilLaboralController = require('../controllers/perfilLaboral');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/testPL', PerfilLaboralController.testPL);
api.post('/register-perfil-laboral', md_auth.ensurreAuth, PerfilLaboralController.savePerfilLaboral);

/*
api.post('/register-aspirante', md_auth.ensurreAuth, PerfilLaboralController.saveAspirante);
api.get('/aspirante/:id', md_auth.ensurreAuth, PerfilLaboralController.getAspirante);
api.get('/aspirantes', md_auth.ensurreAuth, PerfilLaboralController.getAspirantes);
api.put('/update-aspirante/:id', md_auth.ensurreAuth, PerfilLaboralController.updateAspirante);
*/

module.exports = api;