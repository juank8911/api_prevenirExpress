const consu = require('../models/consultorios');


module.exports = function (app)
{
app.post('/addconsul',(req,res)=>{

  let consuls = req.body;
  // console.log(consuls);
  consu.insertConsul1(consuls,(err,resp)=>{
    res.json(resp);
  });
});


app.get('/consulsuc/:ids',(req,res)=>{
    consu.buscarConsulSuc(req.params.ids,(err,resp)=>{
        res.json(resp);
    });
});

app.put('/delconsul/:idc',(req,res)=>{
  consu.deleteConsultorio(req.params.idc,(err,resp)=>{
    res.json(resp)
  })
});

//devuelve los consulturos de un servicio por sucursales
app.get('/consulsucse/:idsu/:idser',(req,res)=>{
  let ids = { idsu: req.params.idsu,
              idser: req.params.idser};
  // console.log(ids);
  consu.getConsultorioSucSer(ids,(err,resp)=>{
    res.json(resp);
  })
});

app.get('/consultorioid/:idc',(req,res)=>{
  consu.getConsultorioIdc(req.params.idc,(err,resp)=>{
      res.json(resp);
  })
});

app.put('/consultorio',(req,res)=>{
  consul = req.body;
  // console.log(req.body);
  // console.log(consul);
  consu.editarConsultorio(consul,(err,resp)=>{
      res.json(resp)
  });
});


}
