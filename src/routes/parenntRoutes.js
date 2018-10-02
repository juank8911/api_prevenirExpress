const parent = require('../models/parentesco');

module.exports = function (app)
{

//devuelve la lista de parentescos
app.get('/parent',(req,res)=>{
parent.darParent((err,data)=>{
res.json(data);
});
});
}
