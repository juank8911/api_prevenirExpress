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



//agrega sucursales y consultorios en el mismo metodo
  sucurModule.agregaSuCon = (sucrs,callback)=>{
    // console.log(sucrs);
    if(connection)
    {
      var sql = 'INSERT INTO sucursales (nombre, direccion, telefono, id_municipio, id_provedor) VALUE (?, ?, ?, ?, ?);'
      var incons = 'INSERT INTO consultorio (nombre, extencion, medico_id, id_sucursales) VALUES (?, ?, ?, ?);';
      var p=0;
      var ids=[];
      var id;
      resp = [];
    // console.log(sucrs.length);

    for (var i = 0; i < sucrs.length; i++) {
      let sucr = sucrs[i];
      // console.log(sucr);
      connection.query(sql,[sucr.nombre, sucr.direccion, sucr.telefono, sucr.id_municipio, sucr.id_provedor],(err,res)=>{
        if(err){throw err}
        else
        {
          // console.log(res);
          ids.push(res.insertId);
          id = res.insertId;
          let consuls = sucr.consultorios;
          consuls.forEach((cons)=>{
            connection.query(incons,[cons.nombre, cons.extencion, cons.medico_id, id],(err,req)=>{
              if(err){throw err}
              else
              {
                resp.push(true);
              }
            });
          });
          p++
          // console.log(p);
          // console.log(p+"contre "+sucrs.length);
          if(p>=sucrs.length)
          {
            callback(null,true);
          }}});}


    }
  };



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
