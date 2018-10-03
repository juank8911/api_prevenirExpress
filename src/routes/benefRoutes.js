const benef = require('../models/beneficiarios');

module.exports = function (app)
{

//devuelve los beneficiarios segun el id usuasrio
app.get('/benef/:id',(req,res)=>{
var id = req.params.id;
benef.darBenefId(idPar,(err,data)=>{
res.json(data);
});
});



}
