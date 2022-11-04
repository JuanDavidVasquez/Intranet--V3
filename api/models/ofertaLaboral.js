'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfertaLaboralSchema = Schema ({
    user:               {type: Schema.ObjectId, ref: 'User'},
    aprobacion:         String,
    titulo:             String,
    cargo:              String,
    description:        String,
    fechaIngreso:       String,
    fechaSolicitud:     String,
    activo:             String,
    image:              String
});

module.exports = mongoose.model('OfertaLaboral', OfertaLaboralSchema);