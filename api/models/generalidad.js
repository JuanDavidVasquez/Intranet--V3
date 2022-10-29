'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeneralidadSchema = Schema ({
    user:                   {type: Schema.ObjectId, ref: 'User'},
    aspiracionSalarial:     String,
    servicioMilitar:        String,
    actividadEntreTrabajo:  String,
    tiempoLibre:            String,
    observaciones:          String
});

module.exports = mongoose.model('Generalidad', GeneralidadSchema);