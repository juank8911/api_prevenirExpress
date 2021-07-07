const topics = require('../models/topics');
const jwts = require('../models/jwt');
const eject = require('../models/ejecucion');
module.exports = function (app)
{

//devuelve los beneficiarios segun el id usuasrio
app.get('/topic/:id',(req,res)=>{
var id = req.params.id;
topics.topicsProvedor(idU,(err,data)=>{
res.json(data);
});
});

//decuelve el salt de del member
app.get('/cambios/:id',(req,res)=>{
  let id = req.params.id;
  eject.cambioSalt(id,(err,row)=>{
    res.json(row)
  });
});

//cambio de contraseña
app.get('/cambioc/:email',(req,res)=>{
  let email = req.params.email;
  eject.cambioContra(email,(err,resp)=>{
    res.json(resp);
  });
});

//aceota la nueva contraseña
app.put('/cambioc',(req,res)=>{
  let dts = req.body;
  console.log(dts);
  eject.aceptaContra(dts,(err,row)=>{
    res.json(row);
  });
});

}
