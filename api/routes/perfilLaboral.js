'use strict'

var express = require('express');
var PerfilLaboralController = require('../controllers/perfilLaboral');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/perfilLaborals'});

api.get('/testPL', PerfilLaboralController.testPL);
api.post('/register-perfil-laboral', md_auth.ensurreAuth, PerfilLaboralController.savePerfilLaboral);
api.get('/perfil-laboral/:id', md_auth.ensurreAuth, PerfilLaboralController.getPerfilLaboral);
api.get('/perfil-laboral-user/:id', md_auth.ensurreAuth, PerfilLaboralController.getPerfilLaboralUser);
api.get('/perfils-laborals', md_auth.ensurreAuth, PerfilLaboralController.getPerfilLaborals);
api.put('/update-perfil-laboral/:id', md_auth.ensurreAuth, PerfilLaboralController.updatePerfilLaboral);
api.post('/upload-image-perfil-laboral/:id', [md_auth.ensurreAuth, md_upload], PerfilLaboralController.uploadPerfilLaboralImage);
api.get('/get-image-perfil-laboral/:imageFile', PerfilLaboralController.getPerfilLaboralImageFile);


/*
api.get('/aspirante/:id', md_auth.ensurreAuth, PerfilLaboralController.getAspirante);
api.get('/aspirantes', md_auth.ensurreAuth, PerfilLaboralController.getAspirantes);
api.put('/update-aspirante/:id', md_auth.ensurreAuth, PerfilLaboralController.updateAspirante);

api.post('/upload-image-user/:id', [md_auth.ensurreAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
*/

module.exports = api;