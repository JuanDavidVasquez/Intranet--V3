'use strict'

const multipart = require('connect-multiparty');
var express = require('express');
var VicioController = require('../controllers/vicio');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multiparty = multipart({uploadDir:'./uploads/vicio'});

api.get('/vicio', VicioController.vicio);
api.post('/register-vicio', md_auth.ensurreAuth, VicioController.saveVicio);
api.get('/vicio/:id', md_auth.ensurreAuth, VicioController.getVicio);
api.get('/vicio-user/:id', md_auth.ensurreAuth, VicioController.getVicioUser);
api.get('/vicio-users', md_auth.ensurreAuth, VicioController.getVicios);
api.put('/update-vicio/:id', md_auth.ensurreAuth, VicioController.updateVicio);

module.exports = api;