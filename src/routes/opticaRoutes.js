const optica = require('../models/optica');

module.exports = function (app)
{

//retona la lista de los municipios segun el id del departamento
app.get('/opticaH/:id',(req,res)=>{

optica.darDatosHistUsu(req.params.id,(err,resp)=>{

//console.log(resp);
res.json(resp);

});

});

}
