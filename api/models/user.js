'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema ({
    name:       String,
    surname:    String,
    surname2:   String,
    cargo:      String,
    fechaIngreso:String,
    fechaRetiro:String,
    salario:    String,
    tipoDocumento:String,
    cedula:     String, 
    nick:       String,
    email:      String,
    password:   String,
    role:       String,
    politica:   String,
    image:      String
});

module.exports = mongoose.model('User', UserSchema);