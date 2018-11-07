const mysql = require('mysql');
let config = require('../config');
let moment = require('moment');

connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let ejectModel = {};

//retorna una lista de horarios libres para la citas medicas
ejectModel.darLibres = (serv,callback)=>
{
console.log(serv);
if(connection)
{
var sql = 'SELECT servicios.max_citas_ves-count(events.id_eventos) as libres  FROM servicios, events WHERE servicios.id_servicios = events.servicios_idservicios and start = ? AND servicios_idservicios = ? ;'
connection.query(sql,[serv.hora,serv.id],(err,res)=>{
res = res[0];
res=res.libres;
////console.lo.log('///////////****//////////');
////console.lo.log(res);
serv.libres = res;
serv.disponible = true;
serv.hora = moment(serv.hora).format('hh:mm a');

////console.lo.log(serv);
callback(null,serv);
});

}
};

// retorna las citas por servicio cuando ahy una cita separada
ejectModel.darCitasOc = (serv,callback)=>
{
  console.log('************////////////////////');
console.log(serv);
if(connection)
{
  if(serv.cate==20)
  {
    console.log('Mascotas');
    var sql = "SELECT events_masc.id_eventos,events_masc.id_mascotas as usuarios_id,events_masc.id_servicios as servicios_idservicios,events_masc.start,events_masc.end, mascotas.nombre as nombres FROM events_masc, mascotas, servicios WHERE mascotas.id_mascotas = events_masc.id_mascotas AND servicios.id_servicios = events_masc.id_servicios AND start = ? AND events_masc.id_servicios = ?;"
  }
  else
  {
    var sql = "SELECT events.* ,concat(usuarios.nombre,' ',usuarios.apellidos) as nombres FROM servicios, events, usuarios WHERE servicios.id_servicios = events.servicios_idservicios and usuarios.id = events.usuarios_id and start = ? AND servicios_idservicios = ? ;"
  }

////console.lo.log(sql);
connection.query(sql,[serv.hora,serv.id],(err,res)=>{
//res;
//res=res.libres;
////console.lo.log('///////////****//////////');
////console.lo.log(res);
if(serv.cate==20)
{
  console.log('Contando mascotas');
  var sql1 = 'SELECT count(events_masc.id_eventos) as echas  FROM servicios, events_masc WHERE servicios.id_servicios = events_masc.id_servicios and start = ? AND events_masc.id_servicios = ?;';
}
else
{
var sql1 = 'SELECT count(events.id_eventos) as echas  FROM servicios, events WHERE servicios.id_servicios = events.servicios_idservicios and start = ? AND servicios_idservicios = ? ';
}
connection.query(sql1,[serv.hora,serv.id],(err,resp)=>{
resp = resp[0];
resp = resp.echas
// //console.lo.log();
serv.echas = resp;
serv.citas = res;
if(JSON.stringify(res)!='[]')
{
serv.disponible = false;

}
else
{
serv.disponible = true;
}
serv.hora = moment(serv.hora).format('hh:mm a');
////console.lo.log(serv);
callback(null,serv);
});
});

}
}

ejectModel.pruebas = (callback)=>{
var fecha1 = moment('1989-11-11'); //fecha de nacimiento
var fecha2 = moment('2018-11-12');  //fecha actual

//console.lo.log(fecha2.diff(fecha1, 'years.days'), ' años de diferencia');
};


module.exports = ejectModel;
