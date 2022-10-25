'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AspiranteSchema = Schema ({
    user:                  {type: Schema.ObjectId, ref: 'User'},
    name:                  String,
    surname:               String,
    surname2:              String,
    email:                 String,
    fuenteReclutamiento:   String,
    cedula:                String,
    cargo:                 String,
    campana:               String,
    experiencia:           String,
    telefono:              String,
    citado:                String,
    observaciones:         String,
    fechaEntrevista:       Date,
    psicologa:             String,
    numeroLlamada:         String,
    interaccion:           String, 
});

module.exports = mongoose.model('Aspirante', AspiranteSchema);