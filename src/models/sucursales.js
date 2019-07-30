let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let sucurModule = {};

// Agrega sucursales a cada provedor en el sistema con su respectiva informacion.

sucurModule.agregarSucursales = (sucrs,callback)=> {
if(connection)
{
  var sql = 'INSERT INTO sucursales (nombre, direccion, telefono, id_municipio, id_provedor) VALUE (?, ?, ?, ?, ?);'
  var p=0;
  var ids=[];
console.log(sucrs.length);
for (var i = 0; i < sucrs.length; i++) {
  let sucr = sucrs[i];
  console.log(sucr);
  connection.query(sql,[sucr.nombre, sucr.direccion, sucr.telefono, sucr.id_municipio, sucr.id_provedor],(err,res)=>{
    if(err){throw err}
    else
    {
      console.log(res);
      ids.push(res.insertId);
      p++
      console.log(p);
      console.log(p+"contre "+sucrs.length);
      if(p>=sucrs.length)
      {
        callback(null,ids);
      }}});}}};

//------------------------------------------------------------------------------------
//                   METODOS DE BUSQUEDA DE sucursales
//  - por Provedor, -
//____________________________________________________________________________________

//busca sucursales segun el id del provedor

sucurModule.verSucrxprovedor = (idp,callback)=>{
  if(connection)
  {
    var sql = 'SELECT * from sucursales WHRE id_provedor = ?'
    connection.query(sql,idp,(err,res)=>{
      if(err){throw err}
      else
      {
        callback(null,res);
      }
    });
  }
};







module.exports = sucurModule;
