const internas = require('../models/citasinternas');

module.exports = function (app)
{

//devuelve listado de categorias
app.get('/cedula',(req,res)=>{
  console.log('da cedulas');
internas.darUsuarios((err,data)=>{
res.json(data);
});
});



}
