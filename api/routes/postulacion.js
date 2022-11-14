'use strict'

var express = require('express');
var PostulacionController = require('../controllers/postulacion');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/postulacions'});

api.post('/register-postulacion',md_auth.ensurreAuth, PostulacionController.savePostulacion);
api.get('/postulacion/:id',md_auth.ensurreAuth, PostulacionController.getPostulacion);
api.get('/postulacions', PostulacionController.getPostulacions);
api.put('/update-postulacion/:id', md_auth.ensurreAuth,PostulacionController.updatePostulacion);
api.delete('/postulacion/:id', md_auth.ensurreAuth,PostulacionController.deletePostulacion);
api.post('/upload-image-postulacion/:id',[md_upload],md_auth.ensurreAuth,PostulacionController.uploadPostulacionImage);
api.get('/get-image-postulacion/:imageFile',md_auth.ensurreAuth, PostulacionController.getPostulacionImageFile);
api.get('/search-oferta/:search', PostulacionController.searchPostulacion);

/*
api.get('/counters/:id?', md_auth.ensurreAuth, NoticiaController.getCounters);
*/

module.exports = api;