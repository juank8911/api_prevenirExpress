const hist = require('../models/historial');
let comen = require('../models/comentarios');
const jwts = require('../models/jwt');

module.exports=function(app)
{

app.get('/hist/:id',(req,res)=>{
  let id = req.params.id;
  hist.darHistorialU(id,(err,row)=>{
    res.json(row);
  });
});

app.get('/histb/:id',(req,res)=>{
  let id = req.params.id;
  hist.darHistorialB(id,(err,row)=>{
    res.json(row);
  });
});

app.get('/histm/:id',(req,res)=>{
  let id = req.params.id;
  hist.historialPel(id,(err,resp)=>{
    res.json(resp)
  });
});


app.post('/coment',(req,res)=>{
  let comm = {
    comentario:req.body.coment,
    califica:req.body.califica,
    id_servicio:req.body.ids,
    id_usuario:req.body.idU,
    id_historial:req.body.idh
  };
  let masc = req.body.masc;
  console.log(comm);
  console.log(masc);
  if(masc==true)
  {
    comen.agregarComentarioM(comm,(err,resp)=>{
      res.json(resp);
    });
  }
  else
  {
    comen.agregarComentario(comm,(err,resp)=>{
      res.json(resp);
    });
  }

});

app.get('/histserusu/:idusu/:idser',(req,res)=>{
  ids = {
    ser: req.params.idser,
    usu: req.params.idusu
  }
  hist.historiaUsuSer(ids,(err,resp)=>{
    res.json(resp);
  });
});

app.get('/histusuced/:idser/:ced',(req,res)=>{
    ids={
      ser: req.params.idser,
      ced: req.params.ced
    }
  hist.historiaUsuCed(ids,(err,resp)=>{
    res.json(resp)
  });
});

//devuelkeve el historial segun el medico del servecio
app.get('/histmed/:mes/:anio/:id_med/:masc/:ser',(req,res)=>{
  ev = {
    mes: req.params.mes,
    anio: req.params.anio,
    med: req.params.id_med,
    id_mascotas: req.params.masc,
    ser: req.params.ser
  };
  hist.historialMedico(ev,(err,resp)=>{
    res.json(resp);
  });
});


}
