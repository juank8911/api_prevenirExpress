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
  if(connection)
  {
    if(cita.existe == true)
    {

    }
    else
    {

    }

  }

};

citasIModule.darUsuarios = (callback)=>{
  if(connection)
  {
    var sel = 'SELECT cedula, nombre FROM usuarios'
    connection.query(sel,(err,row)=>{
      if(err){throw err}
      else
      {
        // console.log(row);
        callback(null,row);
      }
    });
  }
};

citasIModule.darUsuariosID = (id,callback)=>{
  let ids = parseInt(id);
  if(connection)
  {
    var sel = "SELECT * FROM usuarios WHERE cedula = ?; ";
    connection.query(sel,ids,(err,row)=>{
      if(err){throw err}
      else
      {
        console.log(row);
          if (JSON.stringify(row)=='[]')
          {
            callback(null,false);
          }
          else {
            {
                callback(null,row);
            }
          }

      }
    });
  }
};

module.exports = citasIModule;
