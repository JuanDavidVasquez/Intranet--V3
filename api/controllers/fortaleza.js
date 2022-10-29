"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

//Cargar modelo
var Fortaleza = require("../models/fortalza");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function fortaleza(req, res) {
  res.status(200).send({
    message: "Accion de test de fortaleza",
  });
}

//Registro de fortalezas

function saveFortaleza(req, res) {
  var params = req.body;
  var fortaleza = new Fortaleza();

  if (params.nombre) {
    fortaleza.user = req.user.sub;
    fortaleza.nombre = params.nombre;

    //Fortalezas duplicados controll
    Fortaleza.find({

    }).exec((err, fortalezas) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de fortaleza" });

        fortaleza.save((err, fortalezaStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (fortalezaStored) {
            res.status(200).send({ fortaleza: fortalezaStored });
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

function getFortaleza(req, res) {
  var fortalezaId = req.params.id;

  Fortaleza.findById(fortalezaId, (err, fortaleza) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!fortaleza)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      fortaleza,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getFortalezaUser(req, res) {
  var identity_user_Id = req.params.id;

  Fortaleza.find({ user: identity_user_Id }, (err, fortalezas) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!fortalezas)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      fortalezas,
    });
  });
}

//Conseguir todos los perfiles laborales

function getFortalezas(req, res) {
    var identity_user_id = req.user.sub;
  
    Fortaleza.find()
      .sort("_id")
      .exec((err, fortalezas) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!fortalezas)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            fortalezas,
        });
      });
  }

  //Actualizar perfil laboral

  function updateFortaleza(req, res) {
    var fortalezaId = req.params.id;
    var update = req.body;
  
    Fortaleza.findByIdAndUpdate(
      fortalezaId,
      update,
      { new: true },
      (err, fortalezaUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!fortalezaUpdated)
          return res.status(404).send({ message: "No existe el fortaleza" });
  
        return res.status(200).send({
          fortaleza: fortalezaUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadFortalezaImage(req, res){
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
			 
			 // Actualizar documento de Fortaleza logueado
			 Fortaleza.findByIdAndUpdate(certificadoAcademicoId, {certificadoAcademico: file_name}, {new:true}, (err, fortalezaUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!fortalezaUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({fortaleza: fortalezaUpdated});
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

function getFortalezaImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/fortalezas/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    fortaleza,
    saveFortaleza,
    getFortaleza,
    getFortalezaUser,
    getFortalezas,
    updateFortaleza,
    uploadFortalezaImage,
    getFortalezaImageFile,
};
