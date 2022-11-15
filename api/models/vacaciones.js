'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VacacionesSchema = Schema ({
    user:               {type: Schema.ObjectId, ref: 'User'},
    name:               String,
    fechaSolicitud:     String,
    fechaInicio:        String,
    fechaFin:           String,
    AprovacionJefe:     String,
    AprovacionRrHh:     String,
});

module.exports = mongoose.model('Vacaciones', VacacionesSchema);