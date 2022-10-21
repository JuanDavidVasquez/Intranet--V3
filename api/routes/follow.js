'use strict'

var express = require('express');
var FollowController = require('../controllers/follow');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post('/follow', md_auth.ensurreAuth, FollowController.saveFollow);
api.delete('/follow/:id', md_auth.ensurreAuth, FollowController.deleteFollow);
api.get('/following/:id?/:page?', md_auth.ensurreAuth, FollowController.getFollowingUsers);
api.get('/followed/:id?/:page?', md_auth.ensurreAuth, FollowController.getFollowedUsers);
api.get('/get-my-follows/:followed?/:page?', md_auth.ensurreAuth, FollowController.getMyFollows);


module.exports = api;