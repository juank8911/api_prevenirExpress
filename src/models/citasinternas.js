let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let citasIModule = {};


//agrga una nueva cita para el servicio agragando o no un nuevo usuario
citasIModule.nuevaCita = (cita,callback)=>{

};

citasIModule.darUsuarios = (callback)=>{
  if(connection)
  {
    var sel = 'SELECT cedula FROM usuarios'
    connection.query(sel,(err,row)=>{
      if(err){throw err}
      else
      {
        callback(row);
      }
    });
  }
};

module.exports = citasIModule;
