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
//console.log(serv);
if(connection)
{
var sql = 'SELECT servicios.max_citas_ves-count(events.id_eventos) as libres  FROM servicios, events WHERE servicios.id_servicios = events.servicios_idservicios and start = ? AND servicios_idservicios = ? ;'
connection.query(sql,[serv.hora,serv.id],(err,res)=>{
res = res[0];
res=res.libres;
//console.log('///////////****//////////');
//console.log(res);
serv.libres = res;
serv.disponible = true;
serv.hora = moment(serv.hora).format('hh:mm a');

//console.log(serv);
callback(null,serv);
});

}
};

// retorna las citas por servicio cuando ahy una cita separada
ejectModel.darCitasOc = (serv,callback)=>
{
//console.log(serv);
if(connection)
{
var sql = "SELECT events.* ,concat(usuarios.nombre,' ',usuarios.apellidos) as nombres FROM servicios, events, usuarios WHERE servicios.id_servicios = events.servicios_idservicios and usuarios.id = events.usuarios_id and start = ? AND servicios_idservicios = ? ;"
//console.log(sql);
connection.query(sql,[serv.hora,serv.id],(err,res)=>{
//res;
//res=res.libres;
//console.log('///////////****//////////');
//console.log(res);
var sql1 = 'SELECT count(events.id_eventos) as echas  FROM servicios, events WHERE servicios.id_servicios = events.servicios_idservicios and start = ? AND servicios_idservicios = ? ';
connection.query(sql1,[serv.hora,serv.id],(err,resp)=>{
resp = resp[0];
resp = resp.echas
// console.log();
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
//console.log(serv);
callback(null,serv);
});
});

}
}

ejectModel.pruebas = (callback)=>{
var fecha1 = moment('1989-11-11'); //fecha de nacimiento
var fecha2 = moment('2018-11-12');  //fecha actual

console.log(fecha2.diff(fecha1, 'years.days'), ' años de diferencia');
};


module.exports = ejectModel;
