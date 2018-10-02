const hora = require('../models/horario');

module.exports=function(app)
{

  app.post('/horario',(req, res)=>{
    var respuesta=[];
    var p=0;
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

// retorna las citas segun la fecha y el id del servicio
app.get('/citas/:fecha/:id',(req,res)=>{
  serv = {
    fecha:req.params.fecha,
    id:req.params.id
  };
  hora.darDia(serv,(err,resp)=>{
    res.json(resp);
  });
});


// retorna las citas segun la fecha y el id del servicio
app.get('/citaspr/:fecha/:id',(req,res)=>{
  serv = {
    fecha:req.params.fecha,
    id:req.params.id
  };
  hora.darDiaPr(serv,(err,resp)=>{
    res.json(resp);
  });
});



// retorna las citas segun la fecha y el id del servicio para los provedores
app.get('/servcitas/:fecha/:id',(req,res)=>{
prov  = {
  fecha:req.params.fecha,
  id:req.params.id
};
hora.darDiaOc(prov,(err,resp)=>{
  res.json(resp);
});
});

}
