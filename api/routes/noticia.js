'use strict'

var express = require('express');
var NoticiaController = require('../controllers/noticia');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/noticias'});

api.post('/subir-noticia', NoticiaController.saveNoticia);
api.get('/noticia/:id', NoticiaController.getNoticia);
api.get('/noticias', NoticiaController.getNoticias);
api.put('/update-noticia/:id', NoticiaController.updateNoticia);
api.delete('/noticia/:id', NoticiaController.deleteNoticia);
api.post('/upload-image-noticia/:id',[md_upload] ,NoticiaController.uploadNoticiaImage);
api.get('/get-image-noticia/:imageFile', NoticiaController.getNoticiaImageFile);

/*
api.get('/counters/:id?', md_auth.ensurreAuth, NoticiaController.getCounters);
*/

module.exports = api;