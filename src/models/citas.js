const mysql = require('mysql');
let config = require('../config');
let moment = require('moment');
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
 //console.lo.log('***************////CONTEO DE CITAS//');
//console.lo.log(row);
var cate = row.cate;
//console.lo.log(cate);
var serv = {};

for (var i = 0; i < row.length; i++)
{
hora=row[i];
////console.lo.log(hora.hora);
serv = {
hora:hora.hora,
id:row.id,
cate:row.cate
};
////console.lo.log(serv);
eject.darLibres(serv,(err,resp)=> {
////console.lo.log(resp);
p++;
jsonHd.push(resp);
if(row.length==p)
{
////console.lo.log('jsonHd');
////console.lo.log(jsonHd);
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
////console.lo.log(row.id);
var serv = {};

for (var i = 0; i < row.length; i++)
{
hora=row[i];
//console.lo.log('/**************CONTeO DE CITAS');
//console.lo.log(hora.hora);
serv = {
hora:hora.hora,
id:row.id,
cate:row.cate
};
////console.lo.log(serv);
eject.darCitasOc(serv,(err,resp)=> {
////console.lo.log(resp);
p++;
jsonHd.push(resp);
if(p>=row.length)
{
////console.lo.log('jsonHd');
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




module.exports = citasModel;
