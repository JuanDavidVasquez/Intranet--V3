"use strict";
var fs = require("fs");
var path = require("path");

var Vacaciones = require("../models/vacaciones");
var User = require("../models/user");
var jwt = require("../services/jwt");
// Registro

function saveVacaciones(req, res) {
  var params = req.body;
  var vacaciones = new Vacaciones();

  if (params.fechaInicio) {
    vacaciones.user = req.user.sub;
    vacaciones.name = params.name;
    vacaciones.fechaSolicitud = params.fechaSolicitud;
    vacaciones.fechaInicio = params.fechaInicio;
    vacaciones.fechaFin = params.fechaFin;
    vacaciones.AprovacionJefe = params.AprovacionJefe;
    vacaciones.AprovacionRrHh = params.AprovacionRrHh;


    //Usuarios duplicados controll

    Vacaciones.find({
      $or: [
        { user: vacaciones.user }
      ],
    }).exec((err, vacacioness) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de usuarios" });

      if (vacacioness && vacacioness.length >= 1) {
        return res
          .status(200)
          .send({ message: "Ya te ecuentras en un proceso de solicitud de vacaciones, comunicate con tu jefe o el proceso de RrHh" });
      } else {

          vacaciones.save((err, vacacionesStored) => {
            if (err)
              return res
                .status(500)
                .send({ message: "No se ha podido guardar el usuario" });

            if (vacacionesStored) {
              res.status(200).send({ vacaciones: vacacionesStored });
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



// Conseguir datos de un usuario

function getVacaciones(req, res){
	var vacacionesId = req.params.id;

	Vacaciones.findById(vacacionesId, (err, vacaciones) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!vacaciones) return res.status(404).send({message: 'El usuario no existe'});

			return res.status(200).send({
				vacaciones
			});

	});
}


// Devolver un listado de usuarios paginado
function getVacacioness(req, res){
	var vacacionesId = req.params.id;

	Vacaciones.findById(vacacionesId, (err, vacaciones) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!vacaciones) return res.status(404).send({message: 'El usuario no existe'});

			return res.status(200).send({
				vacaciones,
			});


	});
}



function getVacacioness(req,res){

	Vacaciones.find().sort('_id').exec((err,vacacioness)=>{
		if(err) return res.status(500).send({message: 'Error al devolver los datos'});
		if(!vacacioness) return res.status(404).send({message: 'No exisen usuarios para mostrar'});

		return res.status(200).send({
			vacacioness
		});
		
	});
}




// Edición de vacaciones

function updateVacaciones(req, res) {
  var vacacionesId = req.params.id;
  var update = req.body;

  Vacaciones.findByIdAndUpdate(
    vacacionesId,
    update,
    { new: true },
    (err, vacacionesUpdated) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al actualizar los datos" });
      if (!vacacionesUpdated)
        return res.status(404).send({ message: "No existe su solicitud" });

      return res.status(200).send({
        vacaciones: vacacionesUpdated,
      });
    }
  );
}


module.exports = {
  saveVacaciones,
  getVacaciones,
  getVacacioness,
  updateVacaciones,
};
