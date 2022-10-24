const { read, image } = require('pdfkit');
const PDF = require('pdfkit');
const controller = {}
const path = require('path');
const  {Client} = require("pg");
const title = 'Index desde el servidor con pub'

controller.index = (req, res) =>{
    res.render('index', {title})
}
controller.printpdf = (req, res) =>{
    res.render('printpdf/printpdf')
}
 /* coneccioon a base de datos y consulta */

 const obtenercolumnas = async () => {
    const authuser = 2;

    const client = new Client({
        user: 'adm_jacosta',
        host: '192.168.30.205',
        database: 'personaldb',
        password:'$Ja2022Re$',
        post: '5432',
    });

    await client.connect();

    const res = await client.query('select * from users INNER JOIN certificadolaboral ON users.cedula=certificadolaboral.cedula where users.id = ' + authuser);

    const result = res.rows[0];

    await client.end();

    return result;
};


    /* fin consulta */
controller.sendprintpdf = (req, res) =>{

    obtenercolumnas().then((result) => {
    const nombre = result.nombre;
    const apellido1 = result.apellido1;
    const apellido2 = result.apellido2;
    const cedula = result.cedula;
    const fechaIngresodate = result.fechaingreso;
    const fechaIngreso = fechaIngresodate.getDate()+"-"+(fechaIngresodate.getMonth()+1)+"-"+ fechaIngresodate.getFullYear();
    const fechaRetirodate = result.fecharetiro;
    const fechaRetiro = fechaRetirodate.getDate()+"-"+(fechaRetirodate.getMonth()+1)+"-"+ fechaRetirodate.getFullYear();
    const cargo = result.cargo;
    const salario = result.salario;
 
 
    const doc = new PDF({bufferPages: true});
   const date = new Date();
   var current_date = date.getDate()+"-"+(date.getMonth()+1)+"-"+ date.getFullYear();
    const stream = res.writeHead(200, {
       'content-Type': 'application/pdf',
       'content-disposition':`attachment;filename=Certificado-Laboral.pdf`
    });
   
       
/*     doc.image('./logotopo.png', 320, 145, {width: 200, height: 100})
   .text('Stretch', 320, 130);  */ 


 
const ruta_imagenlogo = path.join(__dirname,'../../public/img/certificadolaboral/logotopo.png');
doc.image(ruta_imagenlogo, 370, 75, {width: 240, height: 0})
.zIndex = "-1"

const ruta_imagenlogomarca = path.join(__dirname,'../../public/img/certificadolaboral/logoMarcaAgua.png');
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
    
   
    
    var texto = ' El Señor ' + nombre + ' ' + apellido1 + ' ' +  apellido2 + ' identificado con CC N° ' + 
    cedula + ' labora para esta compañía desde el día ' + fechaIngreso + ' hasta el día '  + fechaRetiro + 
    ' con un contrato indefinido desempeñando el cargo de ' + cargo + ' con una asignaciónbásica mensual de ' +
     salario;
    doc.text(texto, 100, 290,{
        align: 'justify'
    })


    const ruta_imagenfirma = path.join(__dirname,'../../public/img/certificadolaboral/tatiana.png');
    doc.image(ruta_imagenfirma, 90, 390, {width: 200, height: 0})
   
    doc.text('TATIANA SOFÍA CÁCERES PINZÓN', 100, 500)

    doc.text('DIRECTORA DE RECURSOS HUMANOS', 100, 535)

    doc.end();
})
}

module.exports = controller