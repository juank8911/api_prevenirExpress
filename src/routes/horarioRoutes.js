const hora = require('../models/horario');

module.exports=function(app)
{
  app.post('/horario',(req, res)=>{
    horario = req.body.dias;
    horario.id=2;
      console.log(horario);
    hora.agregarHorario(horario,(err,resp)=>{
      res.json(resp);
    })
});

app.post('/citas/:fecha/:id',(req,res)=>{
  serv = {
    fecha:req.params.fecha,
    id:req.params.id
  };
  hora.darDia(serv,(err,resp)=>{
    res.json(resp);
  });
});

}
