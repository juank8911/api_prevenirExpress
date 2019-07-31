const parent = require('../models/parentesco');

module.exports = function (app)
{

//devuelve la lista de parentescos
app.get('/parent',(req,res)=>{
parent.darParent((err,data)=>{
res.json(data);
});
});



//no me acuerdo que hace revisar en models-> paretensco -> prueba
app.get('/prus',(req,resp)=>{
  parent.prueba((err,data)=>{
    resp.json(data);
  });
});
}
