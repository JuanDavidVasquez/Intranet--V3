"use strict";
var fs = require("fs");
var path = require("path");
const perfilLaboral = require("../models/perfilLaboral");

//Cargar modelo
var PerfilLaboral = require("../models/perfilLaboral");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function testPL(req, res) {
    res.status(200).send({
      message: "Accion de test de perfil laboral",
    });
  }

  //Registro de perfilLaborals

function savePerfilLaboral(req, res) {
    var params = req.body;
    var perfilLaboral = new PerfilLaboral();
  
    if (params.motivoRetiro) {
        perfilLaboral.user = req.user.sub;
        perfilLaboral.fechaIngreso = params.fechaIngreso;
        perfilLaboral.fechaRetiro = params.fechaRetiro;
        perfilLaboral.cargo = params.cargo;
        perfilLaboral.jefe = params.jefe;
        perfilLaboral.contactoJefe = params.contactoJefe;
        perfilLaboral.salario = params.salario;
        perfilLaboral.motivoRetiro = params.motivoRetiro;
        perfilLaboral.certificadoLaboral = null;
        perfilLaboral.empresa = params.empresa;
        perfilLaboral.personalACargo = params.personalACargo;
  
  //PerfilLaborals duplicados controll
      PerfilLaboral.find({
        $or: [{ motivoRetiro: perfilLaboral.motivoRetiro.toLowerCase() }],
      }).exec((err, perfilLaborals) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error en la petición de perfilLaboral" });
  
        if (perfilLaborals && perfilLaborals.length >= 1) {
          return res
            .status(200)
            .send({ message: "El usuario que intentas registrar ya existe" });
        } else {
          perfilLaboral.save((err, perfilLaboralStored) => {
            if (err)
              return res
                .status(500)
                .send({ message: "No se ha podido guardar el usuario" });
  
            if (perfilLaboralStored) {
              res.status(200).send({ perfilLaboral: perfilLaboralStored });
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
  

  module.exports = {
    testPL,
    savePerfilLaboral
  };
  