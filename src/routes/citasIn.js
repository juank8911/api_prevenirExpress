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
    console.log('mascota = a true');
      internas.citaMascotas(cita,(err,resp)=>{
        res.json(resp);
      });
  }
  else
  {
    console.log();
    internas.nuevaCita(cita,(err,resp)=>{
      res.json(resp);
    });
  }

});

app.post('/ordencita/:id/:ser',(req,res)=>{
  let usu = {
    id: req.params.id,
    usu: req.params.usu
  }
    citas.CitasUsuarioProv(usu,(err,resp)=>{
      res.json(resp);
    })

})

app.post()


}
