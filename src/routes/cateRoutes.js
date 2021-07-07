const cate = require('../models/categoria');
const optica = require('../models/optica');

module.exports = function (app)
{

//devuelve listado de categorias
app.get('/categoria',(req,res)=>{
cate.darCategoria((err,data)=>{
res.json(data);
});
});

app.put('/opticausu',(req,res)=>{
  var opt = req.body;
  // console.log(opt);
  optica.createHisto(opt,(err,resp)=>{
    res.json(resp);
  });

});

//retona la lista de los municipios segun el id del departamento
app.get('/opticah/:id',(req,res)=>{
optica.darDatosUsu(req.params.id,(err,resp)=>{
//console.log(resp);
res.json(resp);
});});



}
