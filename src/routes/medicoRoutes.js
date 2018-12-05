const med = require('../models/medicos');

module.exports = function (app)
{

app.get('/medicosc/:id',(req,res)=>{
  let id = req.params.id;
  med.buscarMedicoId(id,(err,medi)=>{
    res.json(medi);
  });
});
//devuelve listado de categorias
app.get('/medicos/:id',(req,res)=>{
  let idm = req.params.id;
med.darMedicosProv(idm,(err,data)=>{
res.json(data);
});
});

app.post('/medicos',(req,res)=>{
  let medico = req.body;
  // console.log(req.body);
  let existe = req.body.existe;
  // console.log(existe);
  if(existe==false)
  {
    console.log(medico);
    // medico = medico[0];
    med.agregarMedico(medico,(err,resps)=>{
      res.json(resps);
    });
  }
  else
  {
    med.agregarProvedor(medico,(err,resp)=>{
      res.json(resp);
    });
  }
});


}
