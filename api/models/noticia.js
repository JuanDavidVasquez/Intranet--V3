'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticiaSchema = Schema ({
    tNoticia:    String,
    resumen:    String,
    image:      String
});

module.exports = mongoose.model('Noticia', NoticiaSchema);