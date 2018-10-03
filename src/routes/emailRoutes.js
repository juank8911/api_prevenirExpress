const email = require('../models/email');
const jwts = require('../models/jwt');

module.exports = function (app)
{

  app.post('/sendm',(req,res)=>{
    var mail = {
        remitente: req.body.remitente,
        destino: req.body.destino,
        asunto: req.body.asunto,
        texto: req.body.texto
    };

console.log(req.body);
email.sendMail(mail,(err,data)=>{
  res.json(data);
});
  });
}
