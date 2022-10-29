"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

//Cargar modelo
var Vivienda = require("../models/vivienda");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function vivienda(req, res) {
  res.status(200).send({
    message: "Accion de test de vivienda",
  });
}

//Registro de viviendas

function saveVivienda(req, res) {
  var params = req.body;
  var vivienda = new Vivienda();

  if (params.tipoVivienda) {
    vivienda.user = req.user.sub;
    vivienda.tipoVivienda = params.tipoVivienda;
    vivienda.conQuienVive = params.conQuienVive;

    //viviendas duplicados controll
    Vivienda.find({

    }).exec((err, viviendas) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de vivienda" });

        vivienda.save((err, viviendaStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (viviendaStored) {
            res.status(200).send({ vivienda: viviendaStored });
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

function getVivienda(req, res) {
  var viviendaId = req.params.id;

  Vivienda.findById(viviendaId, (err, vivienda) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!vivienda)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      vivienda,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getViviendaUser(req, res) {
  var identity_user_Id = req.params.id;

  Vivienda.find({ user: identity_user_Id }, (err, viviendas) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!viviendas)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      viviendas,
    });
  });
}

//Conseguir todos los perfiles laborales

function getViviendas(req, res) {
    var identity_user_id = req.user.sub;
  
    Vivienda.find()
      .sort("_id")
      .exec((err, viviendas) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!viviendas)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            viviendas,
        });
      });
  }

  //Actualizar perfil laboral

  function updateVivienda(req, res) {
    var viviendaId = req.params.id;
    var update = req.body;
  
    Vivienda.findByIdAndUpdate(
      viviendaId,
      update,
      { new: true },
      (err, viviendaUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!viviendaUpdated)
          return res.status(404).send({ message: "No existe el vivienda" });
  
        return res.status(200).send({
          vivienda: viviendaUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadViviendaImage(req, res){
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
			 
			 // Actualizar documento de vivienda logueado
			 Vivienda.findByIdAndUpdate(certificadoAcademicoId, {certificadoAcademico: file_name}, {new:true}, (err, viviendaUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!viviendaUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({vivienda: viviendaUpdated});
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

function getViviendaImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/viviendas/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    vivienda,
    saveVivienda,
    getVivienda,
    getViviendaUser,
    getViviendas,
    updateVivienda,
    uploadViviendaImage,
    getViviendaImageFile,
};
