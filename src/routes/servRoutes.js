const serv = require('../models/services');
const jwts = require('../models/jwt');
var fs = require('fs');
var ba64 = require("ba64");

module.exports = function(app)
{

app.post('/services',jwts.validaAdmin,(req,res)=>{
    var servicio = {
      id_prov: req.body.id_usuario,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      duracion: req.body.duracion,
      max_citas: req.body.max_citas,
      video: req.body.video,
      muni: req.body.id_mncp,
      foto64: req.body.imagenes,
      precio: req.body.precio,
      descuento: req.body.descuento,
      categoria: req.body.id_ctga,
      horario: req.body.horarios
      //files: req.files.imagenes
    };

       serv.save64(servicio,(err,data)=>{
         console.log(data);
         res.json(data);
       });


   });


app.get('/services',(req,res)=>{
      console.log('servicios');
      serv.pruebaServicio((req,resp)=>{
        res.json(resp);
      });
    });

app.get('/services/:id',(req,res)=>{
  console.log('dar servicio por id de provedor');
  var id=req.params.id;
  serv.DarServiceUsu(id,(err,data)=>{
    console.log(data);
    res.json(data);
  });
});

app.delete('/services/:id',jwts.validaAdmin,(req,res)=>{
    var id = req.params.id;
    console.log(req);
      console.log('borrando departamento con id= '+req.params.id)
      serv.deleteServ(id,(err,resp)=>{
        res.json(resp);
      });
    });


app.put('/service/:id',jwts.validaAdmin,(req,res)=>{
  var serv = {
    correo:req.body.correo,
    nit: req.body.nit,
    nombre: req.body.nombre,
    direccion:req.body.direcc,
    telefono: req.body.tel,
    whatsapp: req.body.whats,
    descripcion: req.body.descrip
  };
  serv.updateServ(serv,(err, resp)=>{
    res.json(resp);
  });
});


}
