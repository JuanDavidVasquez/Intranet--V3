'use strict'

var express = require('express');
var Certificadolaboralcontroller = require('../controllers/certificadolaboralcontroler');
 
var api = express.Router();


api.get('/certificadolaboral/:id', Certificadolaboralcontroller.sendprintpdf);


    





module.exports = api;