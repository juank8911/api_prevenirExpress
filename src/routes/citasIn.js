const internas = require('../models/citasinternas');
let jwt = require('../models/jwt');

module.exports = function (app)
{

//devuelve listado de categorias
app.get('/cedula/:id',(req,res)=>{
  let id = req.params.id;
  console.log('da cedulas id');
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
  // console.log(cita);
  internas.nuevaCita(cita,(err,resp)=>{
    res.json(resp);
  });
});


}
