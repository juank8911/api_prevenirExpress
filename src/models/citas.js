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

citasModel.countCitas = (row,callback)=>{
  var hora =0;
  let p=0;
  let jsonHd = [];
  //console.log(row.id);
  var serv = {};

    for (var i = 0; i < row.length; i++)
    {
      hora=row[i];
      //console.log(hora.hora);
      serv = {
        hora:hora.hora,
        id:row.id
      };
      //console.log(serv);
      eject.darLibres(serv,(err,resp)=> {
        //console.log(resp);
          p++;
          jsonHd.push(resp);
          if(p>=row.length)
          {
            //console.log('jsonHd');
            //console.log(jsonHd);
            callback(null,jsonHd);
          }
      });



    }

};

citasModel.darCitasUsu = (id,callback)=>{
if(connection)
{
var sql = 'SELECT servicios.nombre, servicios.id_servicios, events.start FROM servicios,events WHERE servicios.id_servicios = events.servicios_idservicios AND usuarios_id = ?';
connection.query(sql,[id],(err,row)=>{
  if(err){throw err}
  else
  {
    callback(null,row);
  }
});
}
};

module.exports = citasModel;
