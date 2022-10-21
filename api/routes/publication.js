'use strict'

var express = require('express');
var PublicationController = require('../controllers/publication');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/publications' });

api.get('/probando-pub', md_auth.ensurreAuth, PublicationController.probando);
api.post('/publication', md_auth.ensurreAuth, PublicationController.savePublication);
api.get('/publications/:page?', md_auth.ensurreAuth, PublicationController.getPublications);
api.get('/publications-user/:user/:page?', md_auth.ensurreAuth, PublicationController.getPublicationsUser);
api.get('/publication/:id', md_auth.ensurreAuth, PublicationController.getPublication);
api.delete('/publication/:id', md_auth.ensurreAuth, PublicationController.deletePublication);
api.post('/upload-image-pub/:id', [md_auth.ensurreAuth, md_upload], PublicationController.uploadImage);
api.get('/get-image-pub/:imageFile', PublicationController.getImageFile);


module.exports = api; 