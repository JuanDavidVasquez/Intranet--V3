'use strict'

var express = require('express');
var MessageController = require('../controllers/message');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/probando-md', md_auth.ensurreAuth, MessageController.probando);
api.post('/message', md_auth.ensurreAuth, MessageController.saveMessage);
api.get('/my-messages/:page?', md_auth.ensurreAuth, MessageController.getReceivedMessages);
api.get('/messages/:page?', md_auth.ensurreAuth, MessageController.getEmmitMessages);
api.get('/unviewed-messages', md_auth.ensurreAuth, MessageController.getUnviewedMessages);
api.get('/set-viewed-messages', md_auth.ensurreAuth, MessageController.setViewedMessages);

module.exports = api;