let mysql =require('mysql');
let config = require('../config');
var moment = require('moment');


connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let eventMascModule = {};




//agrega los eventos a la base de datos
eventMascModule.agregarEventoMasc = (events,callback) =>{
if(connection){
console.log(events);
var valida = 'SELECT createdAT,start FROM events_masc where id_mascotas = ? and DATE(start) = DATE(?); ';
var sql = 'INSERT INTO events_masc(color,start,end,id_mascotas,id_servicios) VALUES (?,?,?,?,?)';
connection.query(valida,[events.usuario,events.start],(err,res)=>{
if(err){throw err}
else {

// res = res[0];
console.log(res);
if(JSON.stringify(res)=='[]')
{
connection.query(sql,[events.color,events.start,events.end,events.mascota,events.servicio],(err,row)=>{
if(err){throw err}
else
{
callback(null,[{'agregado':true}]);
}
});

}
else{  console.log('vacio'); callback(null,[{'reservado':true}]);}
}

});
}
};

module.exports = eventMascModule;
