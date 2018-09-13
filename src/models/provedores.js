let mysql =require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');
let vals = require('./valida');
let fs = require('fs');
let imgmodule = require('./imagenes')


connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});


let provedorModule = {};

provedorModule.regProvedorFace = (prov, callback)=> {
  if(connection)
  {
    var id = prov.cedula;
    var nombre = prov.nombre;
    var correo = prov.email;
    var sql = 'INSERT INTO provedores(id_provedor,nombre,correo,members_id) values (?,?,?,?)';
    connection.query(sql,[id,nombre,correo,id],(err, row)=>{
      if(err)
      {
        console.log('no agregado ususario');
        var error = {'mensaje':'error al agregar usuario', 'agregado':false};
        connection.query('DELETE FROM members WHERE id = ?',[id],(err,res)=>{
        callback(err,mensaje);
        });
        throw err
      }
      else
      {
        console.log('Agregado el ususario');
        var mensaje = {'mensaje':'usuario agregado con exito','existe':'false','id_usuario':id};
        callback(null,mensaje);
      }
    });
  }
};

provedorModule.darProvedor = (callback)=>{
  if(connection)
  {
    var sql = 'SELECT * FROM provedores';
    connection.query(sql,(err,row)=>{
      if(err){throw err;}else{callback(null,row)}
    });
  }
};

provedorModule.darProvedorid = (id,callback)=>{
  var sql = 'SELECT * FROM provedores WHERE id_provedor = ?';
  connection.query(sql,[id],(err,row)=>{
    if(err){throw err}else{console.log(row); callback(null,row)}
  });
};

provedorModule.regProv = (prov, callback)=> {
  var id = prov.cedula;
  var nombre = prov.nombre;
  var correo = prov.email;
  var direccion = prov.direccion;
  var tel = prov.tel;

    var sql = 'INSERT INTO provedores(id_provedor,nit,nombre,correo,direccion,telefono,members_id) values (?,?,?,?,?,?,?)';
      connection.query(sql,[id,id,nombre,correo,direccion,tel,id],(err, row)=>{
          if(err)
          {
            //console.log('no agregado ususario');
            var error = {'mensaje':'error al agregar usuario'};
            connection.query('DELETE FROM members WHERE id = ?',[id],(err,res)=>{
            callback(err,mensaje);
            });
            throw err
          }
          else
          {
            //console.log('Agregado el Provedor');
            var mensaje = {'mensaje':'usuario agregado con exito','existe':false,'id_usuario':id};
            callback(null,mensaje);
          }
      });
};



module.exports = provedorModule;
