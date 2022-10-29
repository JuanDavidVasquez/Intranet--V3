'use strict'

const multipart = require('connect-multiparty');
var express = require('express');
var JudicialController = require('../controllers/judicial');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multiparty = multipart({uploadDir:'./uploads/judicial'});
var md_upload = multipart({uploadDir: './uploads/judicials'});

api.get('/judicialtest', JudicialController.judicial);
api.post('/register-judicial', md_auth.ensurreAuth, JudicialController.saveJudicial);
api.get('/judicial/:id', md_auth.ensurreAuth, JudicialController.getJudicial);
api.get('/judicial-user/:id', md_auth.ensurreAuth, JudicialController.getJudicialUser);
api.get('/judicial-users', md_auth.ensurreAuth, JudicialController.getJudicials);
api.put('/update-judicial/:id', md_auth.ensurreAuth, JudicialController.updateJudicial);
api.post('/upload-image-judicial/:id', [md_auth.ensurreAuth, md_upload], JudicialController.uploadJudicialImage);
api.get('/get-image-judicial/:imageFile', JudicialController.getJudicialImageFile);

module.exports = api;