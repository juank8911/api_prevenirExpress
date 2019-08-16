const consu = require('../models/consultorios');


module.exports = function (app)
{
app.post('/addconsul',(req,res)=>{

  let consuls = req.body;

  consu.insertConsul(consuls,(err,resp)=>{
    res.json(resp);
  });
});


app.get('/consulsuc/:ids',(req,res)=>{
    consu.buscarConsulSuc(req.params.ids,(err,resp)=>{
        res.json(resp);
    });
});

app.delete('')

}
