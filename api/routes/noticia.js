'use strict'

var express = require('express');
var NoticiaController = require('../controllers/noticia');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/noticias'});

api.get('/home', md_auth.ensurreAuth, NoticiaController.home);
api.post('/register', NoticiaController.saveNoticia);
api.post('/login', NoticiaController.loginNoticia);
api.get('/noticia/:id', md_auth.ensurreAuth, NoticiaController.getNoticia);
api.get('/noticias', md_auth.ensurreAuth, NoticiaController.getNoticias);
api.get('/counters/:id?', md_auth.ensurreAuth, NoticiaController.getCounters);
api.put('/update-noticia/:id', md_auth.ensurreAuth, NoticiaController.updateNoticia);
api.post('/upload-image-noticia/:id', [md_auth.ensurreAuth, md_upload], NoticiaController.uploadImage);
api.get('/get-image-noticia/:imageFile', NoticiaController.getImageFile);


module.exports = api;