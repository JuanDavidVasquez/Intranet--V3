'use strict'

var express = require('express');
var AspiranteController = require('../controllers/aspirante');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/test', AspiranteController.test);
api.post('/register-aspirante', md_auth.ensurreAuth, AspiranteController.saveAspirante);
api.get('/aspirantes', md_auth.ensurreAuth, AspiranteController.getAspirantes);

/*
api.get('/aspirante/:id', md_auth.ensurreAuth, AspiranteController.getAspirante);
api.get('/aspirantes', md_auth.ensurreAuth, AspiranteController.getAspirantes);
api.get('/counters/:id?', md_auth.ensurreAuth, AspiranteController.getCounters);
api.put('/update-aspirante/:id', md_auth.ensurreAuth, AspiranteController.updateAspirante);
*/

module.exports = api;