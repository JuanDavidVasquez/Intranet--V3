"use strict";
var fs = require("fs");
var path = require("path");

var Postulacion = require("../models/postulacion");
var User = require("../models/user");
var jwt = require("../services/jwt");
// Registro

function savePostulacion(req, res) {
  var params = req.body;
  var postulacion = new Postulacion();

  if (params.politica) {
    postulacion.user = req.user.sub;
    postulacion.ofertaLaborall = params.ofertaLaborall;
    postulacion.fechaPostulacion = params.fechaPostulacion;
    postulacion.politica = params.politica;

    //postulacions duplicados controll
    Postulacion.find({

    }).exec((err, postulacions) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de postulacion" });

        postulacion.save((err, postulacionStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el usuario" });

          if (postulacionStored) {
            res.status(200).send({ postulacion: postulacionStored });
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

// Conseguir datos de un postulacion
function getPostulacion(req, res) {
  var postulacionId = req.params.id;

  if (postulacionId == null) {
    if (!postulacion)
      return res.status(404).send({ message: "No existe el proyecto" });
  }

  Postulacion.findById(postulacionId, (err, postulacion) => {
    if (err)
      return res.status(500).send({ message: "Error al devolver los datos" });
    if (!postulacion)
      return res.status(404).send({ message: "No existe el usuario" });

    return res.status(200).send({
      postulacion,
    });
  });
}

function getPostulacions(req, res) {
  Postulacion.find()
    .sort("fechaIngreso")
    .exec((err, postulacions) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });
      if (!postulacions)
        return res
          .status(404)
          .send({ message: "No exisen usuarios para mostrar" });

      return res.status(200).send({
        postulacions,
      });
    });
}

function updatePostulacion(req, res) {
  var postulacionId = req.params.id;
  var update = req.body;

  Postulacion.findByIdAndUpdate(
    postulacionId,
    update,
    { new: true },
    (err, postulacionUpdated) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al actualizar los datos" });
      if (!postulacionUpdated)
        return res.status(404).send({ message: "No existe el usuario" });

      return res.status(200).send({
        postulacion: postulacionUpdated,
      });
    }
  );
}
function deletePostulacion(req, res) {
  var postulacionId = req.params.id;

  Postulacion.findByIdAndRemove(
    postulacionId,
    (err, postulacionRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al eliminar el usuario" });
      if (!postulacionRemoved)
        return res
          .status(404)
          .send({ message: "No se puede eliminar el usuario" });

      return res.status(200).send({
        postulacion: postulacionRemoved,
      });
    }
  );
}



// Subir archivos de imagen/avatar de usuario
function uploadPostulacionImage(req, res){
	var postulacionId = req.params.id;

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
			 
			 // Actualizar documento de Postulacion logueado
			 Postulacion.findByIdAndUpdate(postulacionId, {image: file_name}, {new:true}, (err, postulacionUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!postulacionUpdated) return res.status(404).send({message: 'No se ha podido actualizar la oferta'});

				return res.status(200).send({postulacion: postulacionUpdated});
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

function getPostulacionImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/postulacions/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

function searchPostulacion(req,res){
  //sacar el string a buscar
  
  var searchString = req.params.search;
  
  //find or
  
  Postulacion.find({"$or":[
    {"cargo":{"$regex": searchString, "$options":"i"}},
    {"titulo":{"$regex": searchString, "$options":"i"}}
  ]})
  .sort([['cargo', 'descending']])
  .exec((err,postulacions)=>{
  
    if(err){
      return res.status(500).send({
        status: 'error',
        message: 'Error en la petición'
      });
    }
    if(!postulacions || postulacions.length <= 0){
      return res.status(404).send({
        status: 'error',
        message: 'No hay oferta Laborals para que coincidan con tu busquedad'
      });
    }
  
    return res.status(200).send({
      status: 'succes',
      postulacions
    });
  
  });

}


module.exports = {
  savePostulacion,
  getPostulacion,
  getPostulacions,
  updatePostulacion,
  deletePostulacion,
  uploadPostulacionImage,
  getPostulacionImageFile,
  searchPostulacion
};
