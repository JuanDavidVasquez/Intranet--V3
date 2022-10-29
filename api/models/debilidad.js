'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DebilidadSchema = Schema ({
    user:             {type: Schema.ObjectId, ref: 'User'},
    nombre:           String
});

module.exports = mongoose.model('Debilidad', DebilidadSchema);