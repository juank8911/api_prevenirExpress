const sucur = require('../models/sucursales')

module.exports = function (app)
{

// Grega solo una sucursal
  app.post('/addsucur',(req,res)=>{
      console.log(req.body);
      var securs = req.body;
      sucur.agregarSucursales(securs,(err,resp)=>{
        res.json(resp);
      });
  });

//agregaa la sucrsual con sus consultorios
  app.post('/addsucon',(req,res)=>{
    // console.log(req.body);
    var sucurs = req.body;
    sucur.agregaSuCon(sucurs,(err,resp)=>{
      res.json(resp);
    });
  });


}
