"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

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

// Conseguir datos de un perfil laboral

function getPerfilLaboral(req, res) {
  var perfilLaboralId = req.params.id;

  PerfilLaboral.findById(perfilLaboralId, (err, perfilLaboral) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!perfilLaboral)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      perfilLaboral,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getPerfilLaboralUser(req, res) {
  var identity_user_Id = req.params.id;

  PerfilLaboral.find({ user: identity_user_Id }, (err, perfilLaborals) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!perfilLaborals)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      perfilLaborals,
    });
  });
}

//Conseguir todos los perfiles laborales

function getPerfilLaborals(req, res) {
    var identity_user_id = req.user.sub;
  
    PerfilLaboral.find()
      .sort("_id")
      .exec((err, perfilLaborals) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!perfilLaborals)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            perfilLaborals,
        });
      });
  }

  //Actualizar perfil laboral

  function updatePerfilLaboral(req, res) {
    var perfilLaboralId = req.params.id;
    var update = req.body;
  
    PerfilLaboral.findByIdAndUpdate(
      perfilLaboralId,
      update,
      { new: true },
      (err, perfilLaboralUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!perfilLaboralUpdated)
          return res.status(404).send({ message: "No existe el perfilLaboral" });
  
        return res.status(200).send({
          perfilLaboral: perfilLaboralUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadPerfilLaboralImage(req, res){
	var perfiLaboralId = req.params.id;

	if(req.files){
		var file_path = req.files.certificadoLaboral.path;
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
			 
			 // Actualizar documento de PerfilLaboral logueado
			 PerfilLaboral.findByIdAndUpdate(perfiLaboralId, {certificadoLaboral: file_name}, {new:true}, (err, perfilLaboralUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!perfilLaboralUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({perfilLaboral: perfilLaboralUpdated});
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

function getPerfilLaboralImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/perfilLaborals/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    testPL,
    savePerfilLaboral,
    getPerfilLaboral,
    getPerfilLaboralUser,
    getPerfilLaborals,
    updatePerfilLaboral,
    uploadPerfilLaboralImage,
    getPerfilLaboralImageFile,
};
