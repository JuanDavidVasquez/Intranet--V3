'use strict'

var express = require('express');
var UserController = require('../controllers/user');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/home', md_auth.ensurreAuth, UserController.home);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', md_auth.ensurreAuth, UserController.getUser);
api.get('/users', md_auth.ensurreAuth, UserController.getUsers);
api.get('/counters/:id?', md_auth.ensurreAuth, UserController.getCounters);
api.put('/update-user/:id', md_auth.ensurreAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensurreAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api;