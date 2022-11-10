"use strict";
var fs = require("fs");
var path = require("path");

var PiezaGraficaOferta = require("../models/PiezaGraficaOferta");
var User = require("../models/user");
var jwt = require("../services/jwt");
// Registro

function savePiezaGraficaOferta(req, res) {
  var params = req.body;
  var piezaGraficaOferta = new PiezaGraficaOferta();

  if (params.titulo) {
    piezaGraficaOferta.user = req.user.sub;
    piezaGraficaOferta.ofertaLaboral = req.ofertaLaboral.sub;
    piezaGraficaOferta.titulo = params.titulo;
    piezaGraficaOferta.cargo = params.cargo;
    piezaGraficaOferta.description = params.description;
    piezaGraficaOferta.fechaIngreso = params.fechaIngreso;
    piezaGraficaOferta.activo = params.activo;
    piezaGraficaOferta.image = null;

    //piezaGraficaOfertas duplicados controll
    PiezaGraficaOferta.find({

    }).exec((err, piezaGraficaOfertas) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la petición de piezaGraficaOferta" });

        piezaGraficaOferta.save((err, piezaGraficaOfertaStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: "No se ha podido guardar el piezaGraficaOferta" });

          if (piezaGraficaOfertaStored) {
            res.status(200).send({ piezaGraficaOferta: piezaGraficaOfertaStored });
          } else {
            res.status(404).send({ message: "No se ha registrado el piezaGraficaOferta" });
          }
        });
      
    });
  } else {
    res.status(200).send({
      message: "Envia todos los campos necesarios",
    });
  }
}

// Conseguir datos de un PiezaGraficaOferta
function getPiezaGraficaOferta(req, res) {
  var piezaGraficaOfertaId = req.params.id;

  if (piezaGraficaOfertaId == null) {
    if (!piezaGraficaOferta)
      return res.status(404).send({ message: "La piezaGraficaOferta no existe" });
  }

  PiezaGraficaOferta.findById(piezaGraficaOfertaId, (err, piezaGraficaOferta) => {
    if (err)
      return res.status(500).send({ message: "Error al devolver los datos" });
    if (!piezaGraficaOferta)
      return res.status(404).send({ message: "La piezaGraficaOferta no existe" });

    return res.status(200).send({
      piezaGraficaOferta,
    });
  });
}

function getPiezaGraficaOfertas(req, res) {
  PiezaGraficaOferta.find()
    .sort("fechaIngreso")
    .exec((err, piezaGraficaOfertas) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });
      if (!piezaGraficaOfertas)
        return res
          .status(404)
          .send({ message: "No existen piezaGraficaOferta para mostrar" });

      return res.status(200).send({
        piezaGraficaOfertas,
      });
    });
}

function updatePiezaGraficaOferta(req, res) {
  var piezaGraficaOfertaId = req.params.id;
  var update = req.body;

  PiezaGraficaOferta.findByIdAndUpdate(
    piezaGraficaOfertaId,
    update,
    { new: true },
    (err, piezaGraficaOfertaUpdated) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al actualizar los datos" });
      if (!piezaGraficaOfertaUpdated)
        return res.status(404).send({ message: "No existe el usuario" });

      return res.status(200).send({
        piezaGraficaOferta: piezaGraficaOfertaUpdated,
      });
    }
  );
}
function deletePiezaGraficaOferta(req, res) {
  var piezaGraficaOfertaId = req.params.id;

  PiezaGraficaOferta.findByIdAndRemove(
    piezaGraficaOfertaId,
    (err, piezaGraficaOfertaRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al eliminar la piezaGraficaOferta" });
      if (!piezaGraficaOfertaRemoved)
        return res
          .status(404)
          .send({ message: "No se puede eliminar la piezaGraficaOferta" });

      return res.status(200).send({
        piezaGraficaOferta: piezaGraficaOfertaRemoved,
      });
    }
  );
}



// Subir archivos de imagen/avatar de usuario
function uploadPiezaGraficaOfertaImage(req, res){
	var piezaGraficaOfertaId = req.params.id;

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
			 
			 // Actualizar documento de PiezaGraficaOferta logueado
			 PiezaGraficaOferta.findByIdAndUpdate(piezaGraficaOfertaId, {image: file_name}, {new:true}, (err, piezaGraficaOfertaUpdated) =>{
				if(err) return res.status(500).send({message: 'Error en la petición'});

				if(!piezaGraficaOfertaUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

				return res.status(200).send({piezaGraficaOferta: piezaGraficaOfertaUpdated});
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

function getPiezaGraficaOfertaImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/piezaGraficaOfertas/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

function searchPiezaGraficaOferta(req,res){
  //sacar el string a buscar
  
  var searchString = req.params.search;
  
  //find or
  
  PiezaGraficaOferta.find({"$or":[
    {"cargo":{"$regex": searchString, "$options":"i"}},
    {"titulo":{"$regex": searchString, "$options":"i"}}
  ]})
  .sort([['cargo', 'descending']])
  .exec((err,piezaGraficaOfertas)=>{
  
    if(err){
      return res.status(500).send({
        status: 'error',
        message: 'Error en la petición'
      });
    }
    if(!piezaGraficaOfertas || piezaGraficaOfertas.length <= 0){
      return res.status(404).send({
        status: 'error',
        message: 'No hay oferta Laborals para que coincidan con tu busquedad'
      });
    }
  
    return res.status(200).send({
      status: 'succes',
      piezaGraficaOfertas
    });
  
  });

}


module.exports = {
  savePiezaGraficaOferta,
  getPiezaGraficaOferta,
  getPiezaGraficaOfertas,
  updatePiezaGraficaOferta,
  deletePiezaGraficaOferta,
  uploadPiezaGraficaOfertaImage,
  getPiezaGraficaOfertaImageFile,
  searchPiezaGraficaOferta
};
