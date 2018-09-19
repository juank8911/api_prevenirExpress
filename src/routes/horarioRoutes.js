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

app.post('/citas',(req,res)=>{
  serv = {
    fecha:req.body.fecha,
    id:req.body.id
  };
  hora.darDia(serv,(err,resp)=>{
    res.json(resp);
  });
});

}
