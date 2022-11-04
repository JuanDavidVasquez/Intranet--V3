"use strict";
var fs = require("fs");
var path = require("path");

var OfertaLaboral = require("../models/ofertaLaboral");
var User = require("../models/user");
var jwt = require("../services/jwt");
// Registro

function saveOfertaLaboral(req, res) {
  var params = req.body;
  var ofertaLaboral = new OfertaLaboral();

  if (params.titulo) {
    ofertaLaboral.user = req.user.sub;
    ofertaLaboral.titulo = params.titulo;
    ofertaLaboral.cargo = params.cargo;
    ofertaLaboral.description = params.description;
    ofertaLaboral.fechaIngreso = params.fechaIngreso;
    ofertaLaboral.fechaSolicitud = params.fechaSolicitud;
    ofertaLaboral.aprobacion = params.aprobacion;
    ofertaLaboral.activo = params.activo;
    ofertaLaboral.image = null;

    //ofertaLaborals duplicados controll
    OfertaLaboral.find({

    }).exec((err, ofertaLaborals) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de ofertaLaboral" });

        ofertaLaboral.save((err, ofertaLaboralStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (ofertaLaboralStored) {
            res.status(200).send({ ofertaLaboral: ofertaLaboralStored });
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

// Conseguir datos de un OfertaLaboral
function getOfertaLaboral(req, res) {
  var ofertaLaboralId = req.params.id;

  if (ofertaLaboralId == null) {
    if (!ofertaLaboral)
      return res.status(404).send({ message: "No existe el proyecto" });
  }

  OfertaLaboral.findById(ofertaLaboralId, (err, ofertaLaboral) => {
    if (err)
      return res.status(500).send({ message: "Error al devolver los datos" });
    if (!ofertaLaboral)
      return res.status(404).send({ message: "No existe el usuario" });

    return res.status(200).send({
      ofertaLaboral,
    });
  });
}

function getOfertaLaborals(req, res) {
  OfertaLaboral.find()
    .sort("fechaIngreso")
    .exec((err, ofertaLaborals) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });
      if (!ofertaLaborals)
        return res
          .status(404)
          .send({ message: "No exisen usuarios para mostrar" });

      return res.status(200).send({
        ofertaLaborals,
      });
    });
}

function updateOfertaLaboral(req, res) {
  var ofertaLaboralId = req.params.id;
  var update = req.body;

  OfertaLaboral.findByIdAndUpdate(
    ofertaLaboralId,
    update,
    { new: true },
    (err, ofertaLaboralUpdated) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al actualizar los datos" });
      if (!ofertaLaboralUpdated)
        return res.status(404).send({ message: "No existe el usuario" });

      return res.status(200).send({
        ofertaLaboral: ofertaLaboralUpdated,
      });
    }
  );
}
function deleteOfertaLaboral(req, res) {
  var ofertaLaboralId = req.params.id;

  OfertaLaboral.findByIdAndRemove(
    ofertaLaboralId,
    (err, ofertaLaboralRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al eliminar el usuario" });
      if (!ofertaLaboralRemoved)
        return res
          .status(404)
          .send({ message: "No se puede eliminar el usuario" });

      return res.status(200).send({
        ofertaLaboral: ofertaLaboralRemoved,
      });
    }
  );
}



// Subir archivos de imagen/avatar de usuario
function uploadOfertaLaboralImage(req, res){
	var ofertaLaboralId = req.params.id;

	if(req.files){
		var file_path = req.files.image.path;
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
			 
			 // Actualizar documento de ofertaLaboral logueado
			 OfertaLaboral.findByIdAndUpdate(ofertaLaboralId, {image: file_name}, {new:true}, (err, ofertaLaboralUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!ofertaLaboralUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({ofertaLaboral: ofertaLaboralUpdated});
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

function getOfertaLaboralImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/ofertaLaborals/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

function searchOfertaLaboral(req,res){
  //sacar el string a buscar
  
  var searchString = req.params.search;
  
  //find or
  
  OfertaLaboral.find({"$or":[
    {"cargo":{"$regex": searchString, "$options":"i"}},
    {"titulo":{"$regex": searchString, "$options":"i"}}
  ]})
  .sort([['cargo', 'descending']])
  .exec((err,ofertaLaborals)=>{
  
    if(err){
      return res.status(500).send({
        status: 'error',
        message: 'Error en la petición'
      });
    }
    if(!ofertaLaborals || ofertaLaborals.length <= 0){
      return res.status(404).send({
        status: 'error',
        message: 'No hay oferta Laborals para que coincidan con tu busquedad'
      });
    }
  
    return res.status(200).send({
      status: 'succes',
      ofertaLaborals
    });
  
  });

}


module.exports = {
  saveOfertaLaboral,
  getOfertaLaboral,
  getOfertaLaborals,
  updateOfertaLaboral,
  deleteOfertaLaboral,
  uploadOfertaLaboralImage,
  getOfertaLaboralImageFile,
  searchOfertaLaboral
};
