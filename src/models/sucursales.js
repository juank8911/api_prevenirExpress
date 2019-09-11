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
                var sqlm = 'INSERT INTO members (email, admin, password,locked) VALUES ( ?, ?, ?,1)';
                connection.query(sqlm,[sucrs.usuario, 'sucu', sucrs.pssw],(err,resp)=>{
                  if(err){throw err}
                  else
                  {
                    // console.log(resp.insertId);
                    var idm = resp.insertId;
                    // console.log('SUCURSALES INFO COMPLETA')
                    // console.log(sucrs);
                    // console.log('////////////////////////----------');
                    var sql = 'INSERT INTO sucursales (nombre, direccion, telefono, id_municipio, id_provedor,members_id) VALUE (?, ?, ?, ?, ?,?);'
                    var p=0;
                    var ids=[];
                    connection.query(sql,[sucrs.nombre, sucrs.direccion, sucrs.telefono, sucrs.id_municipio, sucrs.id_provedor,idm],(err,res)=>{
                      if(err){
                        // console.log(idm);
                        var sqld = 'DELETE FROM members WHERE id = ?;'
                        connection.query(sqld,[idm],(err1,resp)=>{
                          if(err1){throw err1}
                          else{throw err}
                        })
                      }
                      else
                      {

                        sucrs.consultorios.id_sucursal = res.insertId;
                        sucrs.consultorios.id_provedor = sucrs.id_provedor;
                        // console.log('ENVIO PARA AGREGAR CONSULTORIOS');
                          consul.insertConsul1(sucrs.consultorios,(err,res)=>
                          {
                              // console.log(res);
                              callback(null,true);
                          });

                      }
                    });

                  }
                })
      // }
    }
     };

sucurModule.editarSucursal = (sucur,callback) => {
  if(connection)
  {
    var sql = 'UPDATE sucursales SET nombre = ?, direccion = ?, telefono = ? WHERE id_sucursales = ?;';
    connection.query(sql,[sucur.nombre, sucur.direccion, sucur.telefono, sucur.id_sucursal],(err,row)=>{
        if(err){throw err}
        else
        {
          callback(404,row.protocol41);
        }
    });
  }
};

//------------------------------------------------------------------------------------
//                   METODOS DE BUSQUEDA DE sucursales
//  - por Provedor,
//  - Por id de SUCURSALES
//  - por servicio, provedor, municipio
//  - por id de Members
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

sucurModule.verSucrId = (idp,callback)=>{
  if(connection)
  {
    var sql = 'SELECT sucursales.*, municipio.nombre as municipio FROM sucursales, municipio WHERE sucursales.id_municipio = municipio.id_municipio AND  sucursales.id_sucursales = ?;'
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
    var sql = 'SELECT sucursales.*, municipio.nombre as municipio FROM sucursales, provedores_has_medicos, consultorio, municipio WHERE sucursales.id_sucursales = provedores_has_medicos.id_sucursales AND provedores_has_medicos.id_consultorio = consultorio.id_consultorio AND sucursales.id_municipio = municipio.id_municipio AND consultorio.id_servicios = ? AND provedores_has_medicos.id_provedor = ?  AND sucursales.id_municipio = ?;';
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

//busqueda por id de Members
sucurModule.sucurIdMember = (idm,callback)=>
{
  if(connection)
  {
    var sql = 'SELECT sucursales.*, provedores.avatar from sucursales, provedores WHERE sucursales.id_provedor = provedores.id_provedor AND sucursales.members_id = ?;';
    connection.query(sql,[idm],(err,row)=>{
      if(err){throw err}
      else
      {
        callback(null,row);
      }
    });
  }

};









module.exports = sucurModule;
