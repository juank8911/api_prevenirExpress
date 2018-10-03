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
let img = foto.fotos;
let id = foto.id;
var options = {
min:  000000001
, max:  9999999999
, integer: true
}
var rand = rn(options);
var rand1 = rn(options);
var rand2 = rn(options);
var rand3 = rn(options);
var name = rand1+'_'+rand2+'_'+rand3;
// var fotos = img[0];
fotos = img;
//console.log(img);
var newPath = "src/public/avatars/"+name;
var pathView = "/avatars/"+name;
ba64.writeImageSync(newPath, fotos);
if(!fs.existsSync(newPath))
{
var sql = 'UPDATE usuarios SET avatar= ? WHERE id=?;'
connection.query(sql,[pathView+'.jpeg',id],(err,row)=>{
if(err){throw err}
else {
callback(null,[{'cambio':true}]);
}
});
}
};


fotoModel.setFotoProv = (foto,callback)=>{
  let img = foto.fotos;
  let id = foto.id;
  var options = {
  min:  000000001
  , max:  9999999999
  , integer: true
  }
  var rand = rn(options);
  var rand1 = rn(options);
  var rand2 = rn(options);
  var rand3 = rn(options);
  var name = rand1+'_'+rand2+'_'+rand3;
  // var fotos = img[0];
  fotos = img;
  //console.log(img);
  var newPath = "src/public/avatars/"+name;
  var pathView = "http://cdn.prevenirexpress.com/avatars/"+name;
  ba64.writeImageSync(newPath, fotos);
  if(!fs.existsSync(newPath))
  {
  var sql = 'UPDATE provedores SET avatar= ? WHERE id_provedor=?;'
  connection.query(sql,[pathView+'.jpeg',id],(err,row)=>{
  if(err){throw err}
  else {
  callback(null,[{'cambio':true}]);
  }
  });
  }
};


module.exports = fotoModel;
