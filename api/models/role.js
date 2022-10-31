'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = Schema ({
    nombrestado:        String
});

module.exports = mongoose.model('Role', RoleSchema);