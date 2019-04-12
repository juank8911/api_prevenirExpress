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

// retorna los eventos por cedula del pasiente.
citasModel.CitasUsuarioProv = (usu,callback)=>{
  console.log(usu);
  let res = [];
var sql = "SELECT events.start,events.id_eventos,events.usuarios_id,events.servicios_idservicios,servicios.nombre as servicio,concat(usuarios.nombre,' ',usuarios.apellidos) as paciente,usuarios.avatar, day(now()) as hoy,month(events.start) as mes, day(events.start) as cita, month(events.start) as mescita, servicios_categoria.categoria_idcategoria as categoria FROM events, provedores, servicios, usuarios,servicios_categoria WHERE events.servicios_idservicios = servicios.id_servicios AND servicios.id_provedores = provedores.id_provedor AND events.usuarios_id = usuarios.id AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND provedores.id_provedor = ? AND usuarios.cedula = ? ;";
  connection.query(sql,[usu.ser,usu.id],(err,row)=>{
    if(err){throw err}
    else
    {
      console.log(row);
      var masc = 'SELECT events_masc.*,mascotas.nombre as mascotas,servicios.nombre, servicios_categoria.categoria_idcategoria FROM events_masc, mascotas, servicios, servicios_categoria, usuarios, provedores WHERE events_masc.id_mascotas = mascotas.id_mascotas AND events_masc.id_servicios = servicios.id_servicios AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND mascotas.id_usuarios = usuarios.id AND servicios.id_provedores = provedores.id_provedor AND provedores.id_provedor = ? AND usuarios.cedula = ?;'
                  connection.query(masc,[usu.ser,usu.id],(err,resp)=>{
                    if(err){throw err}
                    else
                    {
                      // cont.masc = 'hola';
                      res.push(row);
                      res.push(resp);
                      res.titulos = row;
                        // row.push({mascotas:res})
                        // row.file = [res];
                        callback(null,res);
                    }
                  });

    }
  })

};

module.exports = citasModel;
