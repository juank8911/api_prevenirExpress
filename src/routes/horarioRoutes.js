const hora = require('../models/horario');

module.exports=function(app)
{
  app.post('/horario',(req, res)=>{
    horarios = req.body;
    //id=horario.id;
    //semana = horario.semana;
      console.log(horarios.length);
    //  console.log(id);
      for (var i = 0; i < horarios.length; i++) {
        console.log(horarios[i]);
      }
     // hora.agregarHorario(horario,(err,resp)=>{
     //   res.json(resp);
     // })
});

app.get('/citas/:fecha/:id',(req,res)=>{
  serv = {
    fecha:req.params.fecha,
    id:req.params.id
  };
  hora.darDia(serv,(err,resp)=>{
    res.json(resp);
  });
});

}
