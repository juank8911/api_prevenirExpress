const serv = require('../models/services');
const jwts = require('../models/jwt');
var fs = require('fs');
var ba64 = require("ba64");

module.exports = function(app)
{

// agrega un servicio a la base de datos retorna true en caso de logragrlo
app.post('/services',jwts.validaAdmin,(req,res)=>{
  var videos = req.body.video;
  if(videos!=null)
  {
      videos = videos.split("/").pop();
  }
  else {
    {
      videos = '4Z4TxFh1tO8';
    }
  }

    var servicio = {
      id_prov: req.body.id_usuario,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      duracion: req.body.duracion,
      max_citas: req.body.max_citas,
      video: videos,
      muni: req.body.id_mncp,
      foto64: req.body.imagenes,
      precio: req.body.precio,
      descuento: req.body.descuento,
      categoria: req.body.id_ctga,
      horario: req.body.horarios,
      categoria: req.body.id_ctga
      //files: req.files.imagenes
    };
    //console.log(servicio.categoria);
       serv.save64(servicio,(err,data)=>{
         console.log(data);
         res.json(data);
       });


   });


// devuelve un json de servicios con sus caracteristicas
app.get('/services',(req,res)=>{
      //console.log('servicios');
      serv.pruebaServicio((req,resp)=>{
        res.json(resp);
      });
    });

//retorna los servicios segun el id del provedor
app.get('/services/:id',(req,res)=>{
  console.log('dar servicio por id de provedor');
  var id=req.params.id;
  serv.DarServiceUsu(id,(err,data)=>{
    //console.log(data);
    res.json(data);
  });
});

//elimina un servicio segun su id
app.delete('/services/:id',jwts.validaAdmin,(req,res)=>{
    var id = req.params.id;
    console.log(req);
      console.log('borrando departamento con id= '+req.params.id)
      serv.deleteServ(id,(err,resp)=>{
        res.json(resp);
      });
    });

// retorna un servicio con su id
app.get('/servicess/:id',(req,res)=>{
  var id = req.params.id;
  serv.darServiciosIdS(id,(err,resp)=>{
    res.json(resp);
  });
});

//actualiza un servicio con la nueva informacion 
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
