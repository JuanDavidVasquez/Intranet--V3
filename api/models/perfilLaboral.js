'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PerfilLaboralSchema = Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  fechaIngreso: String,
  fechaRetiro: String,
  cargo: String,
  jefe: String,
  contactoJefe: String,
  salario: String,
  motivoRetiro: String,
  certificadoLaboral: String,
  empresa: String,
  personalACargo: String,
});

module.exports = mongoose.model('PerfilLaboral', PerfilLaboralSchema);