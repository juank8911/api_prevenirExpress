const internas = require('../models/citasinternas');
const citas = require('../models/citas');
let jwt = require('../models/jwt');

module.exports = function (app)
{

//devuelve listado de categorias
app.get('/cedula/:id/:masc',(req,res)=>{
  let id = {
      ids: req.params.id,
      masc: req.params.masc
    }

  console.log(id.masc);
internas.darUsuariosID(id,(err,data)=>{
res.json(data);
});
});

app.get('/cedula',(req,res)=>{
  console.log('da cedulas');
internas.darUsuarios((err,data)=>{
res.json(data);
});
});

app.post('/citai',jwt.validaAdmin,(req,res)=>{
  // console.log(req.body);
  let cita = req.body;
  let masc = req.body.mascota;
  if(masc==true)
  {
    // console.log('mascota = a true');
      internas.citaMascotas(cita,(err,resp)=>{
        res.json(resp);
      });
  }
  else
  {
    // console.log('cita de usuario');
    console.log(cita);

    internas.nuevaCita(cita,(err,resp)=>{
      res.json(resp);
    });
  }

});


//devuelve las citas de un paciente por cedula segun el provedor
app.get('/ordencita/:ced/:prov',(req,res)=>{
  let usu = {
    id: req.params.ced,
    ser: req.params.prov
  }
    citas.CitasUsuarioProv(usu,(err,resp)=>{
      res.json(resp);
    })

})

//activa la cita de un paciente y la elimina de la tabla eventos
app.post('/activacita',(req,res)=>{
  let cita = req.body;
  internas.activaCitaP(cita,(err,resp)=>{
    res.json(resp);
  });

});

//devuelve las citas del provedor que esten en la tabla de citas activas
app.get('/citasprovac/:pr',(req,res)=>{
  let prov = req.params.pr;
  internas.citasProvAc(prov,(err,resp)=>{
    res.json(resp);
  });
});

//cabia el estado de espera a activa de las de la citas de la tabla activa
app.put('/cambestado/:idca/:idser/:cat',(req,res)=>{
  let activa = {
    idca: req.params.idca,
    idser: req.params.idser,
    cat:req.params.cat
  };

});



}
