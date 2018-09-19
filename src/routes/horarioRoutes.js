const hora = require('../models/horario');

module.exports=function(app)
{
  app.post('/horario',(req, res)=>{
    horario = req.body.dias;
    horario.id=4;
      console.log(horario);
    hora.agregarHorario(horario,(err,resp)=>{
      res.json(resp);
    })
});

}
