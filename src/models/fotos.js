let mysql = require('mysql');
let config = require('../config');
let fs = require('fs');
let imgmodule = require('./imagenes')
var rn = require('random-number');
var ba64 = require("ba64");
var regH = require("./horario");
var diasH = require("./dias");
var hora = require('./horario');

connection = mysql.createConnection({
    host: config.domain,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});


let fotoModel = {};

fotoModel.setFotoUsu = (foto,callback)=>{
  let img = foto;
  let id = foto.id;
  var options = {
      min:  000000001
      , max:  9999999999
      , integer: true
}
 var rand = rn(options);
 var rand1 = rn(options);
 var rand2 = rn(options);
 var rand4 = rn(options);
 var name = rand1_rand2_rand3
 var fotos = img[0];
 fotos = fotos.base64Image;
 var newPath = "src/public/avatars/"+name;
 var pathView = "/avatars/"+name;
 ba64.writeImageSync(newPath, foto);
 if(!fs.existsSync(newPath))
 {
   var sql = 'UPDATE usuarios SET avatar= ? WHERE id=?;'
   connection.query(sql,[pathView+'.jpge',id],(err,row)=>{
     if(err){throw err}
     else {
      callback(null,{'cambio':true});
     }
   });
 }
};


module.exports = fotoModel;
