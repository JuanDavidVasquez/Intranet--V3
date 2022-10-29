'use strict'

const multipart = require('connect-multiparty');
var express = require('express');
var FortalezaController = require('../controllers/fortaleza');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multiparty = multipart({uploadDir:'./uploads/fortaleza'});

api.get('/fortaleza', FortalezaController.fortaleza);
api.post('/register-fortaleza', md_auth.ensurreAuth, FortalezaController.saveFortaleza);
api.get('/fortaleza/:id', md_auth.ensurreAuth, FortalezaController.getFortaleza);
api.get('/fortaleza-user/:id', md_auth.ensurreAuth, FortalezaController.getFortalezaUser);
api.get('/fortaleza-users', md_auth.ensurreAuth, FortalezaController.getFortalezas);
api.put('/update-fortaleza/:id', md_auth.ensurreAuth, FortalezaController.updateFortaleza);

module.exports = api;