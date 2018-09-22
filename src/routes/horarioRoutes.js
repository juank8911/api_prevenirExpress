const hora = require('../models/horario');

module.exports=function(app)
{
  var respuesta=[];
  var p=0;
  app.post('/horario',(req, res)=>{
    //console.log(req.body);
    horarios = req.body.horarios;
      console.log(horarios);
    //id=horario.id;
    //semana = horario.semana;
      console.log(horarios.length);
    //  console.log(id);
     for (var i = 0; i < horarios.length; i++)
      {
        // console.log("horarios nuemro" + i);
        // console.log(horarios[i]);
        hora.agregarHorario(horarios[i],(err,resp)=>{
             respuesta.push(resp);
             console.log(p);
              p++;
             if(p>=horarios.length)
             {
               res.json(respuesta);
             }

        });

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
