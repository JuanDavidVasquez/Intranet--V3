"use strict";
var fs = require('fs');
var path = require('path');

//Cargar modelo
var Noticia = require("../models/noticia");
var jwt = require('../services/jwt');

//Metodos

//Registro de Noticia

function saveNoticia(req, res) {
  
 	var noticia = new Noticia();

  	var params = req.body;
    noticia.titulo = params.titulo;
    noticia.resumen = params.resumen;
    noticia.image = null;

    Noticia.save((err, noticiaStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar'});
        if(!noticiaStored) return res.status(404).send({message: 'No se ha podido guardar la noticia'});
       
        return res.status(200).send({noticia: noticiaStored});
    });
    return res.status(200).send({
        noticia:noticia,
        message: 'Metodo saveNoticia'
    });
}

//

// Conseguir datos de un usuario

function getNoticia(req, res){
	var noticiaId = req.params.id;

	if(noticiaId == null){
		if(!noticiaId) return res.status(404).send({message: 'No existe el noticia'});
	}


	Noticia.findById(noticiaId, (err, noticia) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!noticia) return res.status(404).send({message: 'El usuario no existe'});

		return res.status(200).send({
		noticia,
		});
	});
}

// Devolver un listado de noticias
function getNoticias(req, res){
	var noticiaId = req.params.id;

	Noticia.findById(noticiaId, (err, noticia) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!noticia) return res.status(404).send({message: 'El usuario no existe'});

			return res.status(200).send({
				noticia,
			});
	});
}



// Edición de datos de noticia

function updateNoticia(req, res){
	var noticiaId = req.params.id;
	var update = req.body;
	if(noticia_isset) return res.status(404).send({message: 'Los datos ya están en uso'});
	
	Noticia.findByIdAndUpdate(noticiaId, update, {new:true}, (err, noticiaUpdated) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!noticiaUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

		return res.status(200).send({noticia: noticiaUpdated});
	});
}


// Subir archivos de imagen/avatar de usuario
function uploadImage(req, res){
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

		if(noticiaId != req.noticia.sub){
			return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
		}

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
			 
			 // Actualizar documento de usuario logueado
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

function getImageFile(req, res){
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
	uploadImage,
	getImageFile
}