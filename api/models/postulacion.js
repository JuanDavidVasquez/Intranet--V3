'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostulacionSchema = Schema({
    user:             {type: Schema.ObjectId, ref: 'User'},
    ofertaLaborall:    String,
    fechaPostulacion: String,
    politica:         String
});

module.exports = mongoose.model('Postulacion', PostulacionSchema);