const internas = require('../models/citasinternas');

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


}
