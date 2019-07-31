const masc = require('../models/mascotas');
const jwts = require('../models/jwt');
module.exports = function (app)
{

// crea una nueva mascota
app.post('/mascota',(req,res)=>{
  var mascot = {
    especie:req.body.especie,
    raza:req.body.raza,
    color:req.body.color,
    nombre:req.body.nombre,
    sexo:req.body.sexo,
    fechan:req.body.fechan,
    esteril:req.body.esteril,
    id_usu:req.body.id_usu
  };
  // console.log(req.body);
  masc.agregarMascotas(mascot,(err,resp)=>{
    res.json(resp);
  });
});

//devuelve la  mascota segun el id de la misma
app.get('/mascota/:id',(req,res)=>{
  let id = req.params.id
  masc.darMascotasId(id,(err,resp)=>{
    res.json(resp);
  });
});

//devuelve la mascota por el id del usuario
app.get('/mascotam/:id',(req,res)=>{
  let id = req.params.id;
  masc.darMascotaIDm(id,(err,row)=>{
    res.json(row);
  });
});



}
