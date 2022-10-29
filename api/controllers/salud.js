"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

//Cargar modelo
var Salud = require("../models/salud");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function salud(req, res) {
  res.status(200).send({
    message: "Accion de test de salud",
  });
}

//Registro de saluds

function saveSalud(req, res) {
  var params = req.body;
  var salud = new Salud();

  if (params.estado) {
    salud.user = req.user.sub;
    salud.estado = params.estado;
    salud.accidentes = params.accidentes;
    salud.tipoAccidente = params.tipoAccidente;
    salud.observacion = params.observacion;

    //saluds duplicados controll
    Salud.find({

    }).exec((err, saluds) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de salud" });

        salud.save((err, saludStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (saludStored) {
            res.status(200).send({ salud: saludStored });
          } else {
            res.status(404).send({ message: "No se ha registrado el usuario" });
          }
        });
      
    });
  } else {
    res.status(200).send({
      message: "Envia todos los campos necesarios",
    });
  }
}

// Conseguir datos de un perfil laboral

function getSalud(req, res) {
  var saludId = req.params.id;

  Salud.findById(saludId, (err, salud) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!salud)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      salud,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getSaludUser(req, res) {
  var identity_user_Id = req.params.id;

  Salud.find({ user: identity_user_Id }, (err, saluds) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!saluds)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      saluds,
    });
  });
}

//Conseguir todos los perfiles laborales

function getSaluds(req, res) {
    var identity_user_id = req.user.sub;
  
    Salud.find()
      .sort("_id")
      .exec((err, saluds) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!saluds)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            saluds,
        });
      });
  }

  //Actualizar perfil laboral

  function updateSalud(req, res) {
    var saludId = req.params.id;
    var update = req.body;
  
    Salud.findByIdAndUpdate(
      saludId,
      update,
      { new: true },
      (err, saludUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!saludUpdated)
          return res.status(404).send({ message: "No existe el salud" });
  
        return res.status(200).send({
          salud: saludUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadSaludImage(req, res){
	var certificadoAcademicoId = req.params.id;

	if(req.files){
		var file_path = req.files.certificadoAcademico.path;
		console.log(file_path);
		
		var file_split = file_path.split('\\');
		console.log(file_split);

		var file_name = file_split[2];
		console.log(file_name);

		var ext_split = file_name.split('\.');
		console.log(ext_split);

		var file_ext = ext_split[1];
		console.log(file_ext);

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
			 
			 // Actualizar documento de salud logueado
			 Salud.findByIdAndUpdate(certificadoAcademicoId, {certificadoAcademico: file_name}, {new:true}, (err, saludUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!saludUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({salud: saludUpdated});
			 });

		}else{
			return removeFilesOfUploads(res, file_path, 'Extensión no válida');
		}

	}else{
		return res.status(200).send({message: 'No se han subido imagenes'});
	}
}

function removeFilesOfUploads(res, file_path, message){
	fs.unlink(file_path, (err) => {
		return res.status(200).send({message: message});
	});
}

function getSaludImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/saluds/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    salud,
    saveSalud,
    getSalud,
    getSaludUser,
    getSaluds,
    updateSalud,
    uploadSaludImage,
    getSaludImageFile,
};
