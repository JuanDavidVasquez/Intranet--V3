'use strict'

const multipart = require('connect-multiparty');
var express = require('express');
var DebilidadController = require('../controllers/debilidad');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multiparty = multipart({uploadDir:'./uploads/debilidad'});

api.get('/debilidad', DebilidadController.debilidad);
api.post('/register-debilidad', md_auth.ensurreAuth, DebilidadController.saveDebilidad);
api.get('/debilidad/:id', md_auth.ensurreAuth, DebilidadController.getDebilidad);
api.get('/debilidad-user/:id', md_auth.ensurreAuth, DebilidadController.getDebilidadUser);
api.get('/debilidad-users', md_auth.ensurreAuth, DebilidadController.getDebilidads);
api.put('/update-debilidad/:id', md_auth.ensurreAuth, DebilidadController.updateDebilidad);

module.exports = api;