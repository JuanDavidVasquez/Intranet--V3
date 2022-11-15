'use strict'

var express = require('express');
var VacacionesController = require('../controllers/vacaciones');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/vacacioness'});

api.post('/subir-vacaciones',md_auth.ensurreAuth, VacacionesController.saveVacaciones);
api.get('/vacaciones/:id',md_auth.ensurreAuth, VacacionesController.getVacaciones);
api.get('/vacacioness', VacacionesController.getVacacioness);
api.put('/update-vacaciones/:id', md_auth.ensurreAuth,VacacionesController.updateVacaciones);


/*
api.get('/counters/:id?', md_auth.ensurreAuth, NoticiaController.getCounters);
*/

module.exports = api;