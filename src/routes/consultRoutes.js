const consu = require('../models/consultorios');
var forEach = require('async-foreach').forEach;


module.exports = function (app)
{
app.post('/addconsul',(req,res)=>{

    consu.insertConsul1(req.body,(err,resp)=>{
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
