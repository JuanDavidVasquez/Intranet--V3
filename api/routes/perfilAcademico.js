'use strict'

var express = require('express');
var PerfilAcademicoController = require('../controllers/perfilAcademico');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/perfilAcademicos'});

api.get('/testPA', PerfilAcademicoController.testPA);
api.post('/register-perfil-academico', md_auth.ensurreAuth, PerfilAcademicoController.savePerfilAcademico);
api.get('/perfil-academico/:id', md_auth.ensurreAuth, PerfilAcademicoController.getPerfilAcademico);
api.get('/perfil-academico-user/:id', md_auth.ensurreAuth, PerfilAcademicoController.getPerfilAcademicoUser);
api.get('/perfils-academicos', md_auth.ensurreAuth, PerfilAcademicoController.getPerfilAcademicos);
api.put('/update-perfil-academico/:id', md_auth.ensurreAuth, PerfilAcademicoController.updatePerfilAcademico);
api.post('/upload-image-perfil-academico/:id', [md_auth.ensurreAuth, md_upload], PerfilAcademicoController.uploadPerfilAcademicoImage);
api.get('/get-image-perfil-academico/:imageFile', PerfilAcademicoController.getPerfilAcademicoImageFile);


/*
api.get('/aspirante/:id', md_auth.ensurreAuth, PerfilAcademicoController.getAspirante);
api.get('/aspirantes', md_auth.ensurreAuth, PerfilAcademicoController.getAspirantes);
api.put('/update-aspirante/:id', md_auth.ensurreAuth, PerfilAcademicoController.updateAspirante);

api.post('/upload-image-user/:id', [md_auth.ensurreAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
*/

module.exports = api;