"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

//Cargar modelo
var Vicio = require("../models/vicio");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function vicio(req, res) {
  res.status(200).send({
    message: "Accion de test de Vicio",
  });
}

//Registro de Vicios

function saveVicio(req, res) {
  var params = req.body;
  var vicio = new Vicio();

  if (params.nombre) {
    vicio.user = req.user.sub;
    vicio.nombre = params.nombre;
    vicio.frecuencia = params.vicio;
    vicio.motivo = params.vicio;

    //Vicios duplicados controll
    Vicio.find({

    }).exec((err, vicios) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de vicio" });

        vicio.save((err, vicioStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (vicioStored) {
            res.status(200).send({ vicio: vicioStored });
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

function getVicio(req, res) {
  var vicioId = req.params.id;

  Vicio.findById(vicioId, (err, vicio) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!vicio)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      vicio,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getVicioUser(req, res) {
  var identity_user_Id = req.params.id;

  Vicio.find({ user: identity_user_Id }, (err, vicios) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!vicios)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      vicios,
    });
  });
}

//Conseguir todos los perfiles laborales

function getVicios(req, res) {
    var identity_user_id = req.user.sub;
  
    Vicio.find()
      .sort("_id")
      .exec((err, vicios) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!vicios)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            vicios,
        });
      });
  }

  //Actualizar perfil laboral

  function updateVicio(req, res) {
    var vicioId = req.params.id;
    var update = req.body;
  
    Vicio.findByIdAndUpdate(
      vicioId,
      update,
      { new: true },
      (err, vicioUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!vicioUpdated)
          return res.status(404).send({ message: "No existe el vicio" });
  
        return res.status(200).send({
          vicio: vicioUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadVicioImage(req, res){
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
			 
			 // Actualizar documento de Vicio logueado
			 Vicio.findByIdAndUpdate(certificadoAcademicoId, {certificadoAcademico: file_name}, {new:true}, (err, vicioUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!vicioUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({vicio: vicioUpdated});
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

function getVicioImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/vicios/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    vicio,
    saveVicio,
    getVicio,
    getVicioUser,
    getVicios,
    updateVicio,
    uploadVicioImage,
    getVicioImageFile,
};
