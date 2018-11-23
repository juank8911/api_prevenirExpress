const topics = require('../models/topics');
const jwts = require('../models/jwt');
module.exports = function (app)
{

//devuelve los beneficiarios segun el id usuasrio
app.get('/topic/:id',(req,res)=>{
var id = req.params.id;
topics.topicsProvedor(idU,(err,data)=>{
res.json(data);
});
});


}
