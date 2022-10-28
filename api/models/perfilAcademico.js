'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PerfilAcademicoSchema = Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    lvlAcademico: String,
    titulo: String,
    estado:String,
    instituto:String,
    fechaIngreso:String,
    fechaCulminacion:String,
    certificadoAcademico:String
});

module.exports = mongoose.model('PerfilAcademico', PerfilAcademicoSchema);