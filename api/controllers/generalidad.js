"use strict";
var bcrypt = require("bcrypt-nodejs");
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require("path");

//Cargar modelo
var Generalidad = require("../models/generalidad");
var User = require("../models/user");
var jwt = require("../services/jwt");

//Metodo de pruebas
function generalidad(req, res) {
  res.status(200).send({
    message: "Accion de test de generalidad",
  });
}

//Registro de generalidads

function saveGeneralidad(req, res) {
  var params = req.body;
  var generalidad = new Generalidad();

  if (params.aspiracionSalarial) {
    generalidad.user = req.user.sub;
    generalidad.aspiracionSalarial = params.aspiracionSalarial;   
    generalidad.servicioMilitar= params.servicioMilitar;   
    generalidad.actividadEntreTrabajo= params.actividadEntreTrabajo;
    generalidad.tiempoLibre= params.tiempoLibre;  
    generalidad.observaciones= params.observaciones;   
    //Generalidads duplicados controll
    Generalidad.find({

    }).exec((err, generalidads) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de generalidad" });

        generalidad.save((err, generalidadStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (generalidadStored) {
            res.status(200).send({ generalidad: generalidadStored });
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

function getGeneralidad(req, res) {
  var generalidadId = req.params.id;

  Generalidad.findById(generalidadId, (err, generalidad) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!generalidad)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      generalidad,
    });
  });
}

// Conseguir datos de un perfil laboral de un solo usuario
function getGeneralidadUser(req, res) {
  var identity_user_Id = req.params.id;

  Generalidad.find({ user: identity_user_Id }, (err, generalidads) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });

    if (!generalidads)
      return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({
      generalidads,
    });
  });
}

//Conseguir todos los perfiles laborales

function getGeneralidads(req, res) {
    var identity_user_id = req.user.sub;
  
    Generalidad.find()
      .sort("_id")
      .exec((err, generalidads) => {
        if (err)
          return res.status(500).send({ message: "Error al devolver los datos" });
        if (!generalidads)
          return res
            .status(404)
            .send({ message: "No exisen usuarios para mostrar" });
  
        return res.status(200).send({
            generalidads,
        });
      });
  }

  //Actualizar perfil laboral

  function updateGeneralidad(req, res) {
    var generalidadId = req.params.id;
    var update = req.body;
  
    Generalidad.findByIdAndUpdate(
      generalidadId,
      update,
      { new: true },
      (err, generalidadUpdated) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al actualizar los datos" });
        if (!generalidadUpdated)
          return res.status(404).send({ message: "No existe el generalidad" });
  
        return res.status(200).send({
          generalidad: generalidadUpdated,
        });
      }
    );
  }
  
// Subir archivos de imagen/certificado de usuario

function uploadGeneralidadImage(req, res){
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
			 
			 // Actualizar documento de Generalidad logueado
			 Generalidad.findByIdAndUpdate(certificadoAcademicoId, {certificadoAcademico: file_name}, {new:true}, (err, generalidadUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!generalidadUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({generalidad: generalidadUpdated});
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

function getGeneralidadImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/generalidads/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}
module.exports = {
    generalidad,
    saveGeneralidad,
    getGeneralidad,
    getGeneralidadUser,
    getGeneralidads,
    updateGeneralidad,
    uploadGeneralidadImage,
    getGeneralidadImageFile,
};
