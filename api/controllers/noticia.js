"use strict";
var fs = require("fs");
var path = require("path");

var Noticia = require("../models/noticia");
var jwt = require("../services/jwt");
// Registro

function saveNoticia(req, res) {
  var params = req.body;
  var noticia = new Noticia();

  
  noticia.resumen = params.resumen;
  noticia.tNoticia = params.tNoticia;
  noticia.image = null;

  noticia.save((err, noticiaStored) => {
    if (err) return res.status(500).send({ message: "Error al guardar" });
    if (!noticiaStored)
      return res
        .status(404)
        .send({ message: "No se ha podido guardar la noticia" });

    return res.status(200).send({ noticia: noticiaStored });
  });

  return res.status(200).send({
    noticia: noticia,
    message: "Metodo Savenoticia",
  });
}

// Conseguir datos de un noticia
function getNoticia(req, res) {
  var noticiaId = req.params.id;

  if (noticiaId == null) {
    if (!noticia)
      return res.status(404).send({ message: "No existe el proyecto" });
  }

  Noticia.findById(noticiaId, (err, noticia) => {
    if (err)
      return res.status(500).send({ message: "Error al devolver los datos" });
    if (!noticia)
      return res.status(404).send({ message: "No existe el usuario" });

    return res.status(200).send({
      noticia,
    });
  });
}

function getNoticias(req, res) {
  Noticia.find()
    .sort("-year")
    .exec((err, noticias) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });
      if (!noticias)
        return res
          .status(404)
          .send({ message: "No exisen usuarios para mostrar" });

      return res.status(200).send({
        noticias,
      });
    });
}

function updateNoticia(req, res) {
  var noticiaId = req.params.id;
  var update = req.body;

  Noticia.findByIdAndUpdate(
    noticiaId,
    update,
    { new: true },
    (err, noticiaUpdated) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al actualizar los datos" });
      if (!noticiaUpdated)
        return res.status(404).send({ message: "No existe el usuario" });

      return res.status(200).send({
        noticia: noticiaUpdated,
      });
    }
  );
}
function deleteNoticia(req, res) {
  var noticiaId = req.params.id;

  Noticia.findByIdAndRemove(
    noticiaId,
    (err, noticiaRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al eliminar el usuario" });
      if (!noticiaRemoved)
        return res
          .status(404)
          .send({ message: "No se puede eliminar el usuario" });

      return res.status(200).send({
        noticia: noticiaRemoved,
      });
    }
  );
}



// Subir archivos de imagen/avatar de usuario
function uploadNoticiaImage(req, res){
	var noticiaId = req.params.id;

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
			 
			 // Actualizar documento de noticia logueado
			 Noticia.findByIdAndUpdate(noticiaId, {image: file_name}, {new:true}, (err, noticiaUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!noticiaUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({noticia: noticiaUpdated});
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

function getNoticiaImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/noticias/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
  saveNoticia,
  getNoticia,
  getNoticias,
  updateNoticia,
  deleteNoticia,
  uploadNoticiaImage,
  getNoticiaImageFile
};
