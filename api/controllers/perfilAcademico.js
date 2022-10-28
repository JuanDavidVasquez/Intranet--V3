"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

//Cargar modelo
var PerfilAcademico = require("../models/perfilAcademico");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function testPA(req, res) {
  res.status(200).send({
    message: "Accion de test de perfil academico",
  });
}

//Registro de PerfilAcademicos

function savePerfilAcademico(req, res) {
  var params = req.body;
  var perfilAcademico = new PerfilAcademico();

  if (params.lvlAcademico) {
    perfilAcademico.user = req.user.sub;
    perfilAcademico.lvlAcademico = params.lvlAcademico;
    perfilAcademico.titulo = params.titulo;
    perfilAcademico.estado = params.estado;
    perfilAcademico.instituto = params.instituto;
    perfilAcademico.fechaIngreso = params.fechaIngreso;
    perfilAcademico.fechaCulminacion = params.fechaCulminacion;
    perfilAcademico.certificadoAcademico = null;

    //perfilAcademicos duplicados controll
    PerfilAcademico.find({

    }).exec((err, perfilAcademicos) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de perfilAcademico" });

        perfilAcademico.save((err, perfilAcademicoStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (perfilAcademicoStored) {
            res.status(200).send({ perfilAcademico: perfilAcademicoStored });
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

function getPerfilAcademico(req, res) {
  var perfilAcademicoId = req.params.id;

  PerfilAcademico.findById(perfilAcademicoId, (err, perfilAcademico) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!perfilAcademico)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      perfilAcademico,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getPerfilAcademicoUser(req, res) {
  var identity_user_Id = req.params.id;

  PerfilAcademico.find({ user: identity_user_Id }, (err, perfilAcademicos) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!perfilAcademicos)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      perfilAcademicos,
    });
  });
}

//Conseguir todos los perfiles laborales

function getPerfilAcademicos(req, res) {
    var identity_user_id = req.user.sub;
  
    PerfilAcademico.find()
      .sort("_id")
      .exec((err, perfilAcademicos) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!perfilAcademicos)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            perfilAcademicos,
        });
      });
  }

  //Actualizar perfil laboral

  function updatePerfilAcademico(req, res) {
    var perfilAcademicoId = req.params.id;
    var update = req.body;
  
    PerfilAcademico.findByIdAndUpdate(
      perfilAcademicoId,
      update,
      { new: true },
      (err, perfilAcademicoUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!perfilAcademicoUpdated)
          return res.status(404).send({ message: "No existe el perfilAcademico" });
  
        return res.status(200).send({
          perfilAcademico: perfilAcademicoUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadPerfilAcademicoImage(req, res){
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
			 
			 // Actualizar documento de PerfilAcademico logueado
			 PerfilAcademico.findByIdAndUpdate(certificadoAcademicoId, {certificadoAcademico: file_name}, {new:true}, (err, perfilAcademicoUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!perfilAcademicoUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({perfilAcademico: perfilAcademicoUpdated});
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

function getPerfilAcademicoImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/perfilAcademicos/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    testPA,
    savePerfilAcademico,
    getPerfilAcademico,
    getPerfilAcademicoUser,
    getPerfilAcademicos,
    updatePerfilAcademico,
    uploadPerfilAcademicoImage,
    getPerfilAcademicoImageFile,
};
