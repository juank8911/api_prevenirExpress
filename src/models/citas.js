const mysql = require('mysql');
let config = require('../config');
let moment = require('moment'); moment().utc(-5).format();
var Moment = require('moment-timezone'); Moment().tz('America/Bogota').format();
let eject = require('./ejecucion');

connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let citasModel = {};

// cuenta las citas
citasModel.countCitas = (row,callback)=>{
var hora =0;
let p=1;
let jsonHd = [];
// console.log('***************////CONTEO DE CITAS//');
// console.log(row);
var cate = row.cate;
// console.log(cate);
var serv = {};

for (var i = 0; i < row.length; i++)
{
hora=row[i];
// console.log(hora.hora);
serv = {
hora:hora.hora,
id:row.id,
cate:row.cate
};
// console.log(serv);
eject.darLibres(serv,(err,resp)=> {
////console.lo.log(resp);
p++;
jsonHd.push(resp);
if(row.length==p)
{
////console.lo.log('jsonHd');
// console.log(jsonHd);
callback(null,jsonHd);
}
});

}

};

// retona las citas ocuapadas para la vista de los medicos
citasModel.countCitasOc = (row,callback)=>{
var hora =0;
let p=0;
let jsonHd = [];
// console.log(row.id);
var serv = {};

for (var i = 0; i < row.length; i++)
{
hora=row[i];
// console.log('/**************CONTeO DE CITAS');
// console.log(hora.hora);
serv = {
hora:hora.hora,
id:row.id,
cate:row.cate
};
console.log(serv);
eject.darCitasOc(serv,(err,resp)=> {
console.log(resp);
p++;
jsonHd.push(resp);
if(p>=row.length)
{
// console.log('jsonHd');
////console.lo.log(jsonHd);
callback(null,jsonHd);
}
});
}
};

// retorna las citas por el usuario
citasModel.darCitasUsu = (id,callback)=>{
if(connection)
{
var sql = 'SELECT servicios.nombre, servicios.id_servicios, events.start FROM servicios,events WHERE servicios.id_servicios = events.servicios_idservicios AND usuarios_id = ?';
connection.query(sql,[id],(err,row)=>{
if(err){throw err}
else
{
moment.locale('es');
//console.lo.log(moment().utc().format());
row = row[0];
row.start = moment(row.start).utc(-5).format();
//console.lo.log(row);
callback(null,row);
}
});
}
};

// retorna los eventos por cedula del pasiente.
citasModel.CitasUsuarioProv = (usu,callback)=>{
  console.log(usu);
  let res = [];
  let res1 = [];
  let rest = [];
var sql = "SELECT events.*, concat(usuarios.nombre,' ',usuarios.apellidos) as paciente, usuarios.avatar, day(now()) as hoy,month(now()) as mes, day(events.start) as cita, month(events.start) as mescita, consultorio.nombre, servicios.nombre as servicio, servicios_categoria.categoria_idcategoria as categoria FROM events, usuarios, consultorio, servicios, servicios_categoria WHERE events.usuarios_id = usuarios.id AND events.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = servicios.id_servicios AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND usuarios.cedula = ? AND consultorio.id_sucursales = ? GROUP BY events.id_eventos;";
  connection.query(sql,[usu.id, usu.suc],(err,row)=>{
    if(err){throw err}
    else
    {
      console.log(row);


                    let act = "SELECT citas_activas.*, citas_activas.start as start, servicios.nombre as servicio,concat(usuarios.nombre,' ',usuarios.apellidos) as paciente, usuarios.avatar, day(now()) as hoy,month(now()) as mes, day(citas_activas.start) as cita, month(citas_activas.start) as mescita, consultorio.nombre as consultorio, servicios_categoria.categoria_idcategoria as categoria FROM citas_activas, consultorio, sucursales, usuarios, servicios, con_ser_hor, servicios_categoria WHERE citas_activas.id_consultorio = consultorio.id_consultorio AND sucursales.id_sucursales = consultorio.id_sucursales AND citas_activas.usuarios_id = usuarios.id AND consultorio.id_consultorio = con_ser_hor.id_consultorio AND con_ser_hor.id_servicios = servicios.id_servicios AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND sucursales.id_sucursales = ? AND usuarios.cedula = ? GROUP BY citas_activas.id_citas_activas;";
                    connection.query(act,[usu.suc,usu.id],(err,ress)=>{
                      if(err){throw err}
                      else
                      {
                        // console.log('/*/*/*/*/*/*/*/*/*/');
                        // console.log(ress);
                        if(JSON.stringify(ress)!='[]')
                        {
                          // row = {activas:true};
                          ress[0].activas = true;
                          // console.log(ress);
                          res.push(ress[0]);
                          for (var i = 0; i < row.length; i++) {
                            res.push(row[i]);
                          }
                          // console.log('/*/*/*/*/Despues del if*/*/*/*/*/');
                          // console.log(res);

                        }
                        else
                        {
                          if(JSON.stringify(row)=='[]')
                          {
                              res.push( {activas:false});
                          }
                          else
                          {
                              res.push(row);
                          }

                        }
                      }
                    });


                    var masc = "SELECT events_masc.*,CONVERT_TZ(events_masc.start,'+00:00','-05:00') as start, mascotas.nombre, mascotas.avatar, day(now()) as hoy,month(now()) as mes, day(events_masc.start) as cita, month(events_masc.start) as mescita, consultorio.nombre as consultorio, servicios_categoria.categoria_idcategoria as categoria, servicios.id_servicios FROM events_masc, consultorio, sucursales, mascotas, usuarios, servicios, servicios_categoria WHERE events_masc.id_mascotas = mascotas.id_mascotas AND mascotas.id_usuarios = usuarios.id AND events_masc.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = servicios.id_servicios AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND consultorio.id_sucursales = sucursales.id_sucursales AND sucursales.id_sucursales = ? AND usuarios.cedula = ? GROUP BY events_masc.id_eventos;";
                  connection.query(masc,[usu.suc,usu.id],(err,row1)=>{
                    if(err){throw err}
                    else
                    {
                        let act = 'SELECT citas_activas_masc.*, mascotas.nombre as paciente, mascotas.avatar, consultorio.nombre as consultorio, servicios.nombre as servicio, servicios_categoria.categoria_idcategoria as categoria FROM citas_activas_masc, consultorio, sucursales, mascotas, usuarios, servicios, servicios_categoria, con_ser_hor WHERE citas_activas_masc.id_mascotas = mascotas.id_mascotas AND mascotas.id_usuarios = usuarios.id AND citas_activas_masc.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = servicios.id_servicios AND servicios.id_servicios = con_ser_hor.id_servicios AND consultorio.id_consultorio = con_ser_hor.id_consultorio AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND consultorio.id_sucursales = sucursales.id_sucursales AND sucursales.id_sucursales = ? AND usuarios.cedula = ? GROUP BY citas_activas_masc.id_citas_activas;';
                        connection.query(act,[usu.suc,usu.id],(err,resm)=>{
                            if(err){throw err}
                            else
                            {
                              // console.log('/*/*/*/*MASCOTAS/*/*/*/*/*/');
                              // console.log(row1)
                              // console.log(resm);
                              if(JSON.stringify(resm)!='[]')
                              {
                                // row = {activas:true};
                                resm[0].activas = true;
                                // console.log(resm[0]);
                                res1.push(resm[0]);
                                for (var i = 0; i < row1.length; i++) {
                                  res1.push(row1[i]);
                                }
                                // console.log('/*/*/*/*/Despues del if*/*/*/*/*/');
                                // console.log(res1);

                              }
                              else
                              {
                                if(JSON.stringify(row1)=='[]')
                                {
                                    res1.push( {activas:false});
                                }
                                else
                                {
                                  for (var i = 0; i < row1.length; i++) {
                                    res1.push(row1[i]);
                                  }
                                }

                              }
                              // cont.masc = 'hola';
                              rest.push(res);
                              rest.push(res1);

                                // row.push({mascotas:res})
                                // row.file = [res];
                                callback(null,rest);

                            }
                        });

                    }
                  });

    }
  })

};




module.exports = citasModel;
