const optica = require('../models/optica');

module.exports = function (app)
{

//retona la lista de los municipios segun el id del departamento
app.get('/opticah/:id',(req,res)=>{
optica.darDatosHistUsu(req.params.id,(err,resp)=>{
//console.log(resp);
res.json(resp);
});});

app.put('/opticacr',(req,res)=>{
  var opt = req.body;
  console.log(opt);
  optica.createHistUsu(opt,(err,resp)=>{
    res.json(resp);
  });
});

}
