const fotos = require('../models/fotos');
const jwts = require('../models/jwt');

module.exports = function (app)
{

//cambia la foto de los usuarios en la base de datos
app.put('/fotou',jwts.valida,(req,res)=>{
  //console.log('///////////////////////////************************')
  //console.log(req.body);
var foto = {
fotos:req.body.foto,
id:req.body.id
};
var admin = req.body.admin;
if(admin==false)
{
fotos.setFotoUsu(foto,(err,data)=>{
res.json(data);
});
}
else
{
  fotos.setFotoProv(foto,(err,data)=>{
  res.json(data);
  });
}
});



}
