const sucur = require('../models/sucursales')

module.exports = function (app)
{

  app.post('/addsucur',(req,res)=>{
      console.log(req.body);
      var securs = req.body;
      sucur.agregarSucursales(securs,(err,resp)=>{
        res.json(resp);
      });
  });


}
