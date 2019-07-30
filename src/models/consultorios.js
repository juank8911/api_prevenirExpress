let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let consulModule = {};



//INSERTA CONSULTORIOS A LA SUCURSAL CON SU RESPECTIVO MEDICO
consulModule.insertConsul = (consuls,callback)=>{
if(connection)
{
  var sql = 'INSERT INTO consultorio (nombre, extencion, medico_id, id_sucursales) VALUES (?, ?, ?, ?);';
  var p = 0;
  var ids=[];
  for (var i = 0; i < consuls.length; i++) {
    var consul = consuls[i];
    console.log(consuls.length);
    console.log(consul);
    connection.query(sql,[consul.nombre, consul.extencion, consul.medico_id, consul.id_sucursales],(err,res)=>{
      if(err){throw err}
      else
      {
        console.log(res);
        ids.push(res.insertId);
        p++
        console.log(p);
        console.log(p+"contre "+consuls.length);
        if(p>=consuls.length)
        {
          callback(null,ids);
        }
      }
    })
  }

}

};


module.exports = consulModule;
