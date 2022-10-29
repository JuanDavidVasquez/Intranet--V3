'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaludSchema = Schema ({
    user:          {type: Schema.ObjectId, ref: 'User'},
    estado:        String,
    accidentes:    String,
    tipoAccidente:String,
    observacion:   String  
});

module.exports = mongoose.model('Salud', SaludSchema);