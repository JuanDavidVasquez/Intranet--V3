"use strict";
var fs = require("fs");
var path = require("path");

//Cargar modelo
var Aspirante = require("../models/aspirante");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function test(req, res) {
  res.status(200).send({
    message: "Accion de home de aspirante",
  });
}
//Registro de aspirantes

function saveAspirante(req, res) {
  var params = req.body;
  var aspirante = new Aspirante();

  if (params.cedula) {
    aspirante.user = req.user.sub;
    aspirante.name = params.name;
    aspirante.surname = params.surname;
    aspirante.surname2 = params.surname2;
    aspirante.email = params.email;
    aspirante.cedula = params.cedula;
    aspirante.fuenteReclutamiento = params.fuenteReclutamiento;
    aspirante.cargo = params.cargo;
    aspirante.campana = params.campana;
    aspirante.experiencia = params.experiencia;
    aspirante.telefono = params.telefono;
    aspirante.citado = params.citado;
    aspirante.observaciones = params.observaciones;
    aspirante.fechaEntrevista = params.fechaEntrevista;
    aspirante.psicologa = params.psicologa;
    aspirante.numeroLlamada = params.numeroLlamada;
    aspirante.interaccion = params.interaccion;

//Aspirantes duplicados controll
    Aspirante.find({
      $or: [{ cedula: aspirante.cedula.toLowerCase() }],
    }).exec((err, aspirantes) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de aspirante" });

      if (aspirantes && aspirantes.length >= 1) {
        return res
          .status(200)
          .send({ message: "El usuario que intentas registrar ya existe" });
      } else {
        aspirante.save((err, aspiranteStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (aspiranteStored) {
            res.status(200).send({ aspirante: aspiranteStored });
          } else {
            res.status(404).send({ message: "No se ha registrado el usuario" });
          }
        });
      }
    });
  } else {
    res.status(200).send({
      message: "Envia todos los campos necesarios",
    });
  }
}

// Conseguir datos de un usuario
function getAspirante(req, res) {
  var aspiranteId = req.params.id;

  Aspirante.findById(aspiranteId, (err, aspirante) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!aspirante)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      aspirante,
    });
  });
}
function getAspirantes(req, res) {
  var identity_user_id = req.user.sub;

  Aspirante.find()
    .sort("_id")
    .exec((err, aspirantes) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });
      if (!aspirantes)
        return res
          .status(404)
          .send({ message: "No exisen usuarios para mostrar" });

      return res.status(200).send({
        aspirantes,
      });
    });
}
function updateAspirante(req, res) {
  var aspiranteId = req.params.id;
  var update = req.body;

  Aspirante.findByIdAndUpdate(
    aspiranteId,
    update,
    { new: true },
    (err, aspiranteUpdated) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al actualizar los datos" });
      if (!aspiranteUpdated)
        return res.status(404).send({ message: "No existe el aspirante" });

      return res.status(200).send({
        aspirante: aspiranteUpdated,
      });
    }
  );
}

function searchAspirante(req,res){
  //sacar el string a buscar
  
  var searchString = req.params.search;
  
  //find or
  
  Aspirante.find({"$or":[
    {"name":{"$regex": searchString, "$options":"i"}},
    {"cedula":{"$regex": searchString, "$options":"i"}}
  ]})
  .sort([['cedula', 'descending']])
  .exec((err,aspirantes)=>{
  
    if(err){
      return res.status(500).send({
        status: 'error',
        message: 'Error en la petición'
      });
    }
    if(!aspirantes || aspirantes.length <= 0){
      return res.status(404).send({
        status: 'error',
        message: 'No hay aspirantes para que coincidan con tu busquedad'
      });
    }
  
    return res.status(200).send({
      status: 'succes',
      aspirantes
    });
  
  });

}

module.exports = {
  test,
  saveAspirante,
  getAspirante,
  getAspirantes,
  updateAspirante,
  searchAspirante
};
