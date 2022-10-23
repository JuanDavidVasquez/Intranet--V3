"use strict";
var fs = require('fs');
var path = require('path');

//Cargar modelo
var Aspirante = require("../models/aspirante");
var User = require("../models/user");
var jwt = require('../services/jwt');


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
  
  
    if (
      params.cedula
    ) {
      aspirante.user = req.user.sub;
      aspirante.name = params.name;
      aspirante.surname = params.surname;
      aspirante.surname2 = params.surname2;
      aspirante.nick = params.nick;
      aspirante.email = params.email;
      aspirante.role = "ROLE_Aspirante";
      aspirante.cedula = params.cedula;
 
      aspirante.fuenteReclutamiento = params.fuenteReclutamiento;
      aspirante.cargo               = params.cargo;            
      aspirante.campana             = params.campana;        
      aspirante.experiencia         = params.experiencia;      
      aspirante.telefono            = params.telefono;          
      aspirante.citado              = params.citado;        
      aspirante.observaciones       = params.observaciones;    
      aspirante.fechaEntrevista     = params.fechaEntrevista;  
      aspirante.psicologa           = params.psicologa;         
      aspirante.numeroLlamada       = params.numeroLlamada;     
      aspirante.interaccion         = params.interaccion;       



  
      //Usuarios duplicados controll
  
      Aspirante.find({
        $or: [
          { email: aspirante.email.toLowerCase() }
        ],
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
                res
                  .status(404)
                  .send({ message: "No se ha registrado el usuario" });
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

  function getAspirantes(req,res){

	var identity_user_id = req.user.sub;

	Aspirante.find().sort('_id').exec((err,aspirantes)=>{
		if(err) return res.status(500).send({message: 'Error al devolver los datos'});
		if(!aspirantes) return res.status(404).send({message: 'No exisen usuarios para mostrar'});

		/*
		followAspiranteIds(identity_user_id).then((value) => {
			
			return res.status(200).send({
				users,
				users_following: value.following,
				users_follow_me: value.followed,
			});
			});
		*/
		return res.status(200).send({
			aspirantes
		});
		
		

	/* 	return res.status(200).send({
			aspirantes
		}); */
	});
}
  module.exports = {
    test,
    saveAspirante,
    getAspirantes
}