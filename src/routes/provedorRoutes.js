const jwts = require('../models/jwt');
const users = require('../models/user');
const provers = require('../models/provedores');


module.exports = function(app){

  app.get('/provedores',(req,res)=>{
    provers.darProvedor((err,data)=>{res.json(data)});
  });

  app.get('/provedores/:id',(req,res)=>{
      var idprov = req.params.id;
    provers.darProvedorid(idprov,(err,data)=>{//console.log(data);
       res.json(data)});
  });

}
