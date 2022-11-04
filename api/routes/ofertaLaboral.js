'use strict'

var express = require('express');
var OfertaLaboralController = require('../controllers/ofertaLaboral');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/ofertaLaborals'});

api.post('/subir-ofertaLaboral',md_auth.ensurreAuth, OfertaLaboralController.saveOfertaLaboral);
api.get('/ofertaLaboral/:id',md_auth.ensurreAuth, OfertaLaboralController.getOfertaLaboral);
api.get('/ofertaLaborals', OfertaLaboralController.getOfertaLaborals);
api.put('/update-ofertaLaboral/:id', md_auth.ensurreAuth,OfertaLaboralController.updateOfertaLaboral);
api.delete('/ofertaLaboral/:id', md_auth.ensurreAuth,OfertaLaboralController.deleteOfertaLaboral);
api.post('/upload-image-ofertaLaboral/:id',[md_upload],md_auth.ensurreAuth,OfertaLaboralController.uploadOfertaLaboralImage);
api.get('/get-image-ofertaLaboral/:imageFile',md_auth.ensurreAuth, OfertaLaboralController.getOfertaLaboralImageFile);
api.get('/search-oferta/:search', OfertaLaboralController.searchOfertaLaboral);

/*
api.get('/counters/:id?', md_auth.ensurreAuth, NoticiaController.getCounters);
*/

module.exports = api;