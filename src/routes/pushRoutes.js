const push = require('../models/push');
const jwts = require('../models/jwt');

module.exports=function(app)
{
//guarda las imagenes en el servido y en la base de datos
app.put('/push',(req, res)=>{
var token = {
  token:req.body.token,
  id:req.body.id,
  admin:req.body.admin
};

img.subida(imagen,req);
//  var img = {
//  creador: res.locals.user_id
//  };

});

app.get('/images',(req,res)=>{img.ver((err,data)=>{res.json(data);});});
app.get('/',jwts.valida,(req, res) => {User.getUsers((err, data) => {res.json(data);});});
}
