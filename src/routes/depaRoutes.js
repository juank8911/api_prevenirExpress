const dpart = require('../models/departamentos');

module.exports = function (app)
{

app.get('/departamentos/:id',(req,res)=>{
  var id = 47;
  var idPar = req.params.id;
    dpart.darDepartamentos(idPar,(err,data)=>{
      res.json(data);
    });
});

app.delete('/departamentos/:id',(req,res)=>{

  console.log('borrando departamento con id= '+req.params.id)
  res.json(req.params.id);
});

}
