const mysql = require('mysql');
let config = require('../config');
let moment = require('moment');
let citas = require('./citas');
let dia = require('./dias');

connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let horarioModel = {};

//agrega el horario a la base de datos
horarioModel.agregarHorario = (horario,callback) =>
{
var horas = horario;
var semana = horas.semana;
var dias={};
///console.log(semana);
console.log('/////////*********Horario Recibido Prueba de nulls*********//////////////');
console.log(horario);
if(connection)
{
console.log(horas.t_de+'/'+horas.m_de);
if(horas.t_de==undefined || horas.t_de=='undefind' || horas.t_de==null || horas.t_de=='null' )
{
console.log('horarios de tarde indefinido');

var hsql = 'INSERT INTO horario (de_maniana,a_maniana,id_servicios) VALUES (?,?,?)';

connection.query(hsql,[horas.m_de,horas.m_hasta,horas.id],(err,row)=>{
if(err)
{
throw err
}
else
{

var idH = row.insertId;
dias={
semanas:semana,
id:idH,
ids:horas.id
};
// console.log(dias);
dia.agregarDia(dias,(err,resp)=>{
callback(null,{'res':resp});
});


}

});

}
else if (horas.m_de==undefined || horas.m_de=='undefind' || horas.m_de==null || horas.m_de=='null')
{
console.log('horario de mañana indefinido');
var hsql = 'INSERT INTO horario (de_tarde,a_tarde,id_servicios) VALUES (?,?,?)';

connection.query(hsql,[horas.t_de,horas.t_hasta,horas.id],(err,row)=>{
if(err)
{
throw err
}
else
{
console.log('/////////************Row*************////////////');
console.log(row);
var idH = row.insertId;
console.log('/////////************horas*************////////////');
console.log(horas);
dias={
semanas:semana,
id:idH,
ids:horas.id
};
console.log('/////////************Dias*************////////////');
console.log(dias);
dia.agregarDia(dias,(err,resp)=>{
callback(null,{'res':resp});
});


}

});



}
else
{
var hsql = 'INSERT INTO horario (de_maniana,a_maniana,de_tarde,a_tarde,id_servicios) VALUES (?,?,?,?,?)';

connection.query(hsql,[horas.m_de,horas.m_hasta,horas.t_de,horas.t_hasta,horas.id],(err,row)=>{
if(err)
{
throw err
}
else
{

var idH = row.insertId;
dias={
semanas:semana,
id:idH,
ids:horas.id
};
// console.log(dias);
dia.agregarDia(dias,(err,resp)=>{
callback(null,{'res':resp});
});


}

});
}


}
}

// retorna los dias de la semana con su horario
horarioModel.darDiapr = (fecha,callback)=>{
var manana = [];
var tarde = [];
var derro = [];
var horaD = 0;
var hora = 0;
moment.locale('es');

var dia = moment(fecha.fecha).format('dddd');
// console.log(fecha.id);
//callback(null,dia);
if(connection)
{
var sql1 = 'select * from horario where id_servicios = ?';
connection.query(sql1,[fecha.id],(err,rows)=>{
console.log('/////////////////primera consulta*******************');
console.log(rows);
console.log('/////////////////primera consulta*******************');
});



var sql = 'SELECT dias.*, horario.* from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? '
connection.query(sql,[dia,fecha.id],(err,row)=>{

console.log(row);
if(err){throw err}
else
{
//console.log(dia);
if (JSON.stringify(row)=='[]') {
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "no ahy citas disponibles",'disponible':false},]},{'tardes':[{"hora": "no ahy citas disponibles",'disponible':false},]}]);
}
else
{    var hd = row[0];
console.log(hd);

var m_de = fecha.fecha+" "+hd.de_maniana;
var m_hasta = fecha.fecha+" "+hd.a_maniana;
var t_de = fecha.fecha+" "+hd.de_tarde;
var t_hasta = fecha.fecha+" "+hd.a_tarde;
horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');

// console.log(horaD +" < "+ m_hasta);
console.log(hd.a_maniana);
if(hd.a_maniana==null)
{
manana.hora = "no ahy citas disponibles";
manana.disponible = false;
var maniana =
console.log('//////adentro mañana sin cita');
}
else
{
console.log('//////adentro mañana con cita');
do {
hora = moment(horaD).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora});
horaD = moment(horaD).add(1,'hour');
//console.log(horaD);

} while (horaD.isBefore(m_hasta));
hora = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora,'disponible':true});
manana.id = parseInt(fecha.id);
citas.countCitas(manana,(err,maniana)=>{
derro.push({maniana});
console.log('///////////////derrotero');
console.log(derro);
});

hora=0;
}
if(hd.de_tarde==null)
{
var tardes = []
tarde.hora = "no ahy citas disponibles";
tarde.disponible = false;
console.log('//////adentro tarde sin cita');
tardes.push({tarde});
derro.push({tardes});
console.log(maniana);
// callback(null,);
}
else
{
console.log('//////adentro tarde con cita');
do {
// console.log('////////////TARDE///////////')

hora = moment(horaT).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
horaT = moment(horaT).add(1,'hour');
// console.log(hora+"/"+horaT);
} while (horaT.isBefore(t_hasta));
hora = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
tarde.id = parseInt(fecha.id);
citas.countCitas(tarde,(err,tardes)=>{
derro.push({tardes});
callback(null,derro);
});
}

//console.log(m_de)

//callback(null,manana);
}
}
});
}

};





// da los dias con lo horarios y citas disponibles

horarioModel.darDia = (fecha,callback)=>{
var manana = [];
var tarde = [];
var derro = [];
var tardes = [];
var maniana = [];
var horaD = 0;
var hora = 0;
moment.locale('es');

var dia = moment(fecha.fecha).format('dddd');
// console.log(fecha.id);
//callback(null,dia);
if(connection)
{
var sql1 = 'select * from horario where id_horario = (select dias.id_horario from dias where dias.dia = ? and servicios_id_servicios = ?);';
connection.query(sql1,[dia,fecha.id],(err,rows)=>{
console.log('/////////////////primera consulta*******************');
var row = rows;
rows = rows[0];
console.log(row);
console.log('/////////////////primera consulta*******************');
//if cuando solo ahy citas para la mañana y la tarde esta vacia
if (JSON.stringify(row)=='[]')
{
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "No ahy citas",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy citas",'disponible':false,"echas":0},]}]);
}
else
{


if((rows.de_maniana !=null && rows.de_tarde==null)|| (rows.de_maniana !='null' && rows.de_tarde=='null'))
{
console.log('////////////////citas en la tarde vacias *******************');
var sql = 'SELECT dias.*, horario.id_horario,horario.de_maniana, horario.a_maniana,horario.id_servicios from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? ';
connection.query(sql,[dia,fecha.id],(err,row)=>{

if(err){throw err}
else
{
  console.log(row);
if (JSON.stringify(row)=='[]')
{
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "No ahy citas",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy citas",'disponible':false,"echas":0},]}]);
}
else
{
var tardes = [{"hora": "No ahy citas",'disponible':false,"echas":0}];
var hd = row[0];
// console.log(hd);
var m_de = fecha.fecha+" "+hd.de_maniana;
var m_hasta = fecha.fecha+" "+hd.a_maniana;
// var t_de = fecha.fecha+" "+hd.de_tarde;
// var t_hasta = fecha.fecha+" "+hd.a_tarde;
horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
// horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
// t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
do {
hora = moment(horaD).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora});

horaD = moment(horaD).add(1,'hour');
//console.log(horaD);

} while (horaD.isBefore(m_hasta));
hora = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora,'disponible':true});
manana.id = parseInt(fecha.id);
citas.countCitas(manana,(err,maniana)=>{
//tardes.push({tarde});
derro.push({maniana},{tardes});
console.log(derro);
callback(null,derro);
});}}});

}
else if((rows.de_maniana ==null && rows.de_tarde!=null)|| (rows.de_maniana =='null' && rows.de_tarde!='null') )
{
console.log('////////////////citas en la tarde llenas mañana vacias *******************');
var sql = 'SELECT dias.*, horario.id_horario,horario.de_tarde, horario.a_tarde,horario.id_servicios from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? ';
connection.query(sql,[dia,fecha.id],(err,row)=>{
if(err){throw err}
else
{
console.log(row);
if (JSON.stringify(row)=='[]') {
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "No ahy citas",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy citas",'disponible':false,"echas":0},]}]);
}
else
{
var hd = row[0];
console.log(hd);
//var m_de = fecha.fecha+" "+hd.de_maniana;
//var m_hasta = fecha.fecha+" "+hd.a_maniana;
var t_de = fecha.fecha+" "+hd.de_tarde;
var t_hasta = fecha.fecha+" "+hd.a_tarde;
//horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
//m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
var maniana = [{"hora": "No ahy citas",'disponible':false,"echas":0}];

do {
// console.log('////////////TARDE///////////')
hora = moment(horaT).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
horaT = moment(horaT).add(1,'hour');
// console.log(hora+"/"+horaT);
} while (horaT.isBefore(t_hasta));
console.log('////////////*******dentro de la consulta////********');
hora = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
//maniana.push({mani});
tarde.id = parseInt(fecha.id);
citas.countCitas(tarde,(err,tardes)=>{

derro.push({maniana},{tardes});
callback(null,derro);
});


}

}});

}
else if ((rows.de_maniana !=null && rows.de_tarde!=null) || (rows.de_maniana !='null' && rows.de_tarde!='null'))
{
  console.log('////////////////dos horarios iguales *******************');
var sql = 'SELECT dias.*, horario.* from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? ';
connection.query(sql,[dia,fecha.id],(err,row)=>{
if(err){throw err}
else
{
//console.log(dia);
if (JSON.stringify(row)=='[]') {
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "No ahy citas",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy citas",'disponible':false,"echas":0},]}]);
}
else
{
var hd = row[0];
// console.log(hd);
var m_de = fecha.fecha+" "+hd.de_maniana;
var m_hasta = fecha.fecha+" "+hd.a_maniana;
var t_de = fecha.fecha+" "+hd.de_tarde;
var t_hasta = fecha.fecha+" "+hd.a_tarde;
horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
do {
hora = moment(horaD).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora});
horaD = moment(horaD).add(1,'hour');
//console.log(horaD);

} while (horaD.isBefore(m_hasta));
hora = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora,'disponible':true});
manana.id = parseInt(fecha.id);
citas.countCitas(manana,(err,maniana)=>{
derro.push({maniana});
//console.log(derro[0]);
hora=0;
do {
// console.log('////////////TARDE///////////')
hora = moment(horaT).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
horaT = moment(horaT).add(1,'hour');
// console.log(hora+"/"+horaT);
} while (horaT.isBefore(t_hasta));
hora = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
tarde.id = parseInt(fecha.id);
citas.countCitas(tarde,(err,tardes)=>{

derro.push({tardes});
callback(null,derro);
});
});
}
}});
}
}
});
}};


// retorna el horario del dia con sus citas
horarioModel.darDiaOc = (fecha,callback)=>{
var manana = [];
var tarde = [];
var derro = [];
var horaD = 0;
var hora = 0;
moment.locale('es');

var dia = moment(fecha.fecha).format('dddd');
// console.log(fecha.id);
//callback(null,dia);
if(connection)
{
  var sql1 = 'select * from horario where id_horario = (select dias.id_horario from dias where dias.dia = ? and servicios_id_servicios = ?);';
  connection.query(sql1,[dia,fecha.id],(err,rows)=>{
  console.log('/////////////////primera consulta*******************');
  var row = rows;
  rows = rows[0];
  console.log(row);
  console.log('/////////////////primera consulta*******************');
  //if cuando solo ahy citas para la mañana y la tarde esta vacia
  if (JSON.stringify(row)=='[]')
  {
  //execute
  //  console.log('vacio');
  callback(null,[{'maniana':[{"hora": "No ahy citas",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy citas",'disponible':false,"echas":0},]}]);
  }
  else
  {


if(rows.de_maniana !=null && rows.de_tarde==null)
{
//console.log('////////////////citas en la tarde vacias *******************');
var sql = 'SELECT dias.*, horario.id_horario,horario.de_maniana, horario.a_maniana,horario.id_servicios from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? ';
connection.query(sql,[dia,fecha.id],(err,row)=>{
if(err){throw err}
else
{
if (JSON.stringify(row)=='[]') {
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "No ahy citas",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy citas",'disponible':false,"echas":0},]}]);
}
else
{
var tardes = [{"hora": "No ahy citas",'disponible':false,"echas":0}];
var hd = row[0];
// console.log(hd);
var m_de = fecha.fecha+" "+hd.de_maniana;
var m_hasta = fecha.fecha+" "+hd.a_maniana;
// var t_de = fecha.fecha+" "+hd.de_tarde;
// var t_hasta = fecha.fecha+" "+hd.a_tarde;
horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
// horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
// t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
do {
hora = moment(horaD).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora});

horaD = moment(horaD).add(1,'hour');
//console.log(horaD);

} while (horaD.isBefore(m_hasta));
hora = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora,'disponible':true});
manana.id = parseInt(fecha.id);
citas.countCitasOc(manana,(err,maniana)=>{
//tardes.push({tarde});
derro.push({maniana},{tardes});
console.log(derro);
callback(null,derro);
});}}});

}
else if(rows.de_maniana ==null && rows.de_tarde!=null)
{
console.log('////////////////citas en la tarde llenas mañana vacias *******************');
var sql = 'SELECT dias.*, horario.id_horario,horario.de_tarde, horario.a_tarde,horario.id_servicios from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? ';
connection.query(sql,[dia,fecha.id],(err,row)=>{
if(err){throw err}
else
{
console.log(row);
if (JSON.stringify(row)=='[]') {
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "No ahy atencion en este horario",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy atencion en este horario",'disponible':false,"echas":0},]}]);
}
else
{
var hd = row[0];
console.log(hd);
//var m_de = fecha.fecha+" "+hd.de_maniana;
//var m_hasta = fecha.fecha+" "+hd.a_maniana;
var t_de = fecha.fecha+" "+hd.de_tarde;
var t_hasta = fecha.fecha+" "+hd.a_tarde;
//horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
//m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
var maniana = [{"hora": "No ahy atencion en este horario",'disponible':false,"echas":0}];

do {
// console.log('////////////TARDE///////////')
hora = moment(horaT).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
horaT = moment(horaT).add(1,'hour');
// console.log(hora+"/"+horaT);
} while (horaT.isBefore(t_hasta));
console.log('////////////*******dentro de la consulta////********');
hora = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
//maniana.push({mani});
tarde.id = parseInt(fecha.id);
citas.countCitasOc(tarde,(err,tardes)=>{

derro.push({maniana},{tardes});
callback(null,derro);
});


}

}});

}
else if (rows.de_maniana !=null && rows.de_tarde!=null)
{
var sql = 'SELECT dias.*, horario.* from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? ';
connection.query(sql,[dia,fecha.id],(err,row)=>{
if(err){throw err}
else
{
//console.log(dia);
if (JSON.stringify(row)=='[]') {
//execute
//  console.log('vacio');
callback(null,[{'maniana':[{"hora": "No ahy atencion en este horario",'disponible':false,"echas":0},]},{'tardes':[{"hora": "No ahy citas",'disponible':false,"echas":0},]}]);
}
else
{
var hd = row[0];
// console.log(hd);
var m_de = fecha.fecha+" "+hd.de_maniana;
var m_hasta = fecha.fecha+" "+hd.a_maniana;
var t_de = fecha.fecha+" "+hd.de_tarde;
var t_hasta = fecha.fecha+" "+hd.a_tarde;
horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
do {
hora = moment(horaD).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora});
horaD = moment(horaD).add(1,'hour');
//console.log(horaD);

} while (horaD.isBefore(m_hasta));
hora = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
manana.push({hora,'disponible':true});
manana.id = parseInt(fecha.id);
citas.countCitasOc(manana,(err,maniana)=>{
derro.push({maniana});
//console.log(derro[0]);
hora=0;
do {
// console.log('////////////TARDE///////////')
hora = moment(horaT).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
horaT = moment(horaT).add(1,'hour');
// console.log(hora+"/"+horaT);
} while (horaT.isBefore(t_hasta));
hora = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
tarde.push({hora});
tarde.id = parseInt(fecha.id);
citas.countCitasOc(tarde,(err,tardes)=>{

derro.push({tardes});
callback(null,derro);
});


});


}
}});





}
}
});
}

};







horarioModel.eliminarHorario = (ids,callback)=>{
if(connection)
{
var idH = 'SELECT id_horario FROM horario WHERE id_servicios = ?';
var delD = 'DELETE FROM dias WHERE servicios_id_servicios = ?;';
var delH = 'DELETE FROM horario WHERE id_servicios = ?';
connection.query(idH,[ids],(err,row)=>{
if(err){throw err}
else
{
var idHo = row[0];
idHo = idHo.id_horario;
// console.log(idHo);

connection.query(delD,[ids],(err,resp)=>{
if(err){throw err}
else
{

connection.query(delH,[ids],(err,res)=>{
if(err){throw err}
else
{
// console.log('borrados');
callback(null,'ok');
}
});
}
});
}
});
}
};
module.exports = horarioModel;
