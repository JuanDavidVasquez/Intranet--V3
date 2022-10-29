'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ViviendaSchema = Schema ({
    user:                  {type: Schema.ObjectId, ref: 'User'},
    tipoVivienda:           String,
    conQuienVive:           String,
});

module.exports = mongoose.model('Vivienda', ViviendaSchema);