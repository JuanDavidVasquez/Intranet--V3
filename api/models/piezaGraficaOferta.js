'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PiezaGraficaOfertaSchema = Schema ({
    ofertaLaboral:      {type: Schema.ObjectId, ref: 'OfertaLaboral'},
    user:               {type: Schema.ObjectId, ref: 'User'},
    titulo:             String,
    cargo:              String,
    description:        String,
    fechaIngreso:       String,
    activo:             String,
    image:              String
});

module.exports = mongoose.model('PiezaGraficaOferta', PiezaGraficaOfertaSchema);