'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VicioSchema = Schema ({
    user:          {type: Schema.ObjectId, ref: 'User'},
    nombre:        String,
    frecuencia:    String,
    motivo:        String
});

module.exports = mongoose.model('Vicio', VicioSchema);