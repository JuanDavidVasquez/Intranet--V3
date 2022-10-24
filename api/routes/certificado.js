'use strict'

var express = require('express');
var CertificadoController = require('../controllers/certificado');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/certificado', md_auth.ensurreAuth, CertificadoController.sendprintpdf);

module.exports = api;