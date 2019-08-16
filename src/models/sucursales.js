let mysql = require('mysql');
let config = require('../config');
let hora = require('./horario');
let csh = require('./con_ser_hor')
let consul = require('./consultorios')
let cate = require('./categoria')

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
        console.log('SUCURSALES INFO COMPLETA')
        console.log(sucrs);
        console.log('////////////////////////----------');
        var sql = 'INSERT INTO sucursales (nombre, direccion, telefono, id_municipio, id_provedor) VALUE (?, ?, ?, ?, ?);'
        var p=0;
        var ids=[];
        connection.query(sql,[sucrs.nombre, sucrs.direccion, sucrs.telefono, sucrs.id_municipio, sucrs.id_provedor],(err,res)=>{
          if(err){throw err}
          else
          {

            sucrs.consultorios.id_sucursal = res.insertId;
            sucrs.consultorios.id_provedor = sucrs.id_provedor;
            // console.log('ENVIO PARA AGREGAR CONSULTORIOS');
              consul.insertConsul1(sucrs.consultorios,(err,res)=>
              {
                  console.log(res);
                  callback(null,true);
              });

          }
        });
      // }
    }
     };

//------------------------------------------------------------------------------------
//                   METODOS DE BUSQUEDA DE sucursales
//  - por Provedor,
//  -
//____________________________________________________________________________________

//busca sucursales segun el id del provedor

sucurModule.verSucrxprovedor = (idp,callback)=>{
  if(connection)
  {
    var sql = 'SELECT sucursales.*, municipio.nombre as municipio FROM sucursales, municipio WHERE sucursales.id_municipio = municipio.id_municipio AND  sucursales.id_provedor = ?;'
    connection.query(sql,idp,(err,res)=>{
      if(err){throw err}
      else
      {
        callback(null,res);
      }
    });
  }
};


//sucursales por servicio, provedor, municipio

sucurModule.sucurServMun = (ids, callback)=>
{
  if(connection)
  {
    var sql = 'SELECT sucursales.* FROM sucursales, provedores_has_medicos, consultorio WHERE sucursales.id_sucursales = provedores_has_medicos.id_sucursales AND provedores_has_medicos.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = ? AND provedores_has_medicos.id_provedor = ?  AND sucursales.id_municipio = ?;';
    connection.query(sql,[ids.id_ser,ids.id_prov,ids.id_muni],(err,su)=>{
      if(err){throw err}
      else
          {
            // console.log('RESPUESTA DE LA CONASULTA A LA BD');
            // console.log(su);
            callback(null,su);
          }
    });
  }
}









module.exports = sucurModule;
