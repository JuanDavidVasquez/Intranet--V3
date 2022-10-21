'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//Conexión Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/intranet', { useNewUrlParser: true })
        .then(()=>{
             console.log("Conexión a la base de datos establecida con éxito...");

            //creación servidor
            app.listen(port,()=>{
                console.log("Servidor corriendo correctamente en la url localhost: "+port);
            });

        })
        .catch(err => console.log(err));