'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JudicialSchema = Schema ({
    user:               {type: Schema.ObjectId, ref: 'User'},
    nombre:             String,
    certificadoJudicial:String
});

module.exports = mongoose.model('Judicial', JudicialSchema);