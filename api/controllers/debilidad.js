"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

//Cargar modelo
var Debilidad = require("../models/debilidad");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function debilidad(req, res) {
  res.status(200).send({
    message: "Accion de test de debilidad",
  });
}

//Registro de debilidads

function saveDebilidad(req, res) {
  var params = req.body;
  var debilidad = new Debilidad();

  if (params.nombre) {
    debilidad.user = req.user.sub;
    debilidad.nombre = params.nombre;

    //Debilidads duplicados controll
    Debilidad.find({

    }).exec((err, debilidads) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de debilidad" });

        debilidad.save((err, debilidadStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (debilidadStored) {
            res.status(200).send({ debilidad: debilidadStored });
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

function getDebilidad(req, res) {
  var debilidadId = req.params.id;

  Debilidad.findById(debilidadId, (err, debilidad) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!debilidad)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      debilidad,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getDebilidadUser(req, res) {
  var identity_user_Id = req.params.id;

  Debilidad.find({ user: identity_user_Id }, (err, debilidads) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!debilidads)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      debilidads,
    });
  });
}

//Conseguir todos los perfiles laborales

function getDebilidads(req, res) {
    var identity_user_id = req.user.sub;
  
    Debilidad.find()
      .sort("_id")
      .exec((err, debilidads) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!debilidads)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            debilidads,
        });
      });
  }

  //Actualizar perfil laboral

  function updateDebilidad(req, res) {
    var debilidadId = req.params.id;
    var update = req.body;
  
    Debilidad.findByIdAndUpdate(
      debilidadId,
      update,
      { new: true },
      (err, debilidadUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!debilidadUpdated)
          return res.status(404).send({ message: "No existe el debilidad" });
  
        return res.status(200).send({
          debilidad: debilidadUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadDebilidadImage(req, res){
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
			 
			 // Actualizar documento de Debilidad logueado
			 Debilidad.findByIdAndUpdate(certificadoAcademicoId, {certificadoAcademico: file_name}, {new:true}, (err, debilidadUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!debilidadUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({debilidad: debilidadUpdated});
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

function getDebilidadImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/debilidads/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    debilidad,
    saveDebilidad,
    getDebilidad,
    getDebilidadUser,
    getDebilidads,
    updateDebilidad,
    uploadDebilidadImage,
    getDebilidadImageFile,
};
