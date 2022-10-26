const { read, image } = require('pdfkit');
const PDF = require('pdfkit');
const controller = {}
const path = require('path');
const  {Client} = require("pg");

 //Cargar modelo
 var User = require("../models/user");  

    /* fin consulta */
controller.sendprintpdf = (req, res, id) =>{
  userId = req.params.id;  


        /* busqueda del en el modelo */
        User.findById(userId, (err, user) => {  

              const nombre = user.name;
              const apellido1 = user.surname;
              const apellido2 = user.surname2;
              const cedula = user.cedula;
              const fechaIngreso = user.fechaIngreso;
              const fechaRetiro = user.fechaRetiro;
              const cargo = user.cargo;
              const salario = user.salario; 
         

    const doc = new PDF({bufferPages: true});
   const date = new Date();
   var current_date = date.getDate()+"-"+(date.getMonth()+1)+"-"+ date.getFullYear();
    const stream = res.writeHead(200, {
       'content-Type': 'application/pdf',
       'content-disposition':`attachment;filename=Certificado-Laboral.pdf`
    });


 
   const ruta_imagenlogo = path.join(__dirname,'../../client/src/assets/img/logotopo_slogan_R_Arriba.png');
doc.image(ruta_imagenlogo, 370, 75, {width: 240, height: 0})
.zIndex = "-1"   

 const ruta_imagenlogomarca = path.join(__dirname,'../../client/src/assets/img/rrhh/logoMarcaAgua.png');
doc.image(ruta_imagenlogomarca, 120, 125, {width: 400, height: 0, }) 
 

    doc.on('data',  (data) => {stream.write(data)});
    doc.on('end', () => {stream.end()});


    doc.text('Bogota D.C / '+current_date, 100, 160)
    .fontSize(25)
    doc.text('CERTIFICACIÓN LABORAL', 100, 230,{
       align: 'center',  
       
    })
    .fontSize(14)
    .lineGap(8)
    
   
    if (fechaRetiro == null) {
      var texto = ' El Señor ' + nombre + ' ' + apellido1 + ' ' +  apellido2 + ' identificado con CC N° ' + 
      cedula + ' labora para esta compañía desde el día ' + fechaIngreso + ' a la fecha con un contrato indefinido desempeñando el cargo de ' 
      + cargo + ' con una asignaciónbásica mensual de ' +
       salario;
     }else{
      var texto = ' El Señor ' + nombre + ' ' + apellido1 + ' ' +  apellido2 + ' identificado con CC N° ' + 
      cedula + ' labora para esta compañía desde el día ' + fechaIngreso + ' hasta el día '  + fechaRetiro + 
      ' con un contrato indefinido desempeñando el cargo de ' + cargo + ' con una asignaciónbásica mensual de ' +
       salario;
     }
    doc.text(texto, 100, 290,{
        align: 'justify'
    })


     const ruta_imagenfirma = path.join(__dirname,'../../client/src/assets/img/firmas/tatiana.png');
    doc.image(ruta_imagenfirma, 90, 390, {width: 200, height: 0}) 
   
    doc.text('TATIANA SOFÍA CÁCERES PINZÓN', 100, 500)

    doc.text('DIRECTORA DE RECURSOS HUMANOS', 100, 535)

    doc.end();
    
     
}); 
}

module.exports = controller