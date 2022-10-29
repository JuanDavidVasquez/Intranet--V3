'use strict'

const multipart = require('connect-multiparty');
var express = require('express');
var SaludController = require('../controllers/salud');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multiparty = multipart({uploadDir:'./uploads/salud'});

api.get('/salud', SaludController.salud);
api.post('/register-salud', md_auth.ensurreAuth, SaludController.saveSalud);
api.get('/salud/:id', md_auth.ensurreAuth, SaludController.getSalud);
api.get('/salud-user/:id', md_auth.ensurreAuth, SaludController.getSaludUser);
api.get('/salud-users', md_auth.ensurreAuth, SaludController.getSaluds);
api.put('/update-salud/:id', md_auth.ensurreAuth, SaludController.updateSalud);

module.exports = api;