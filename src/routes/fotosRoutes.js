const fotos = require('../models/fotos');

module.exports = function (app)
{

//cambia la foto de los usuarios en la base de datos
app.put('/fotou',(req,res)=>{
var foto = {
foto:req.body.foto,
id:req.body.id
};
fotos.setFotoUsu(foto,(err,data)=>{
res.json(data);
});
});



}
