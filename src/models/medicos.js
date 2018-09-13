let mysql =require('sync-mysql');
let config = require('../config');

connection = new mysql({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let medicosModule = {};


medicosModule.darMedicosServ = (id, callback)=>{
if(connection)
{
  var sql = 'SELECT * FROM medicos WHERE servicios_idservicios = ?';
  connection.query(sql,[id],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      callback(null,row);
    }
  });

}

};

medicosModule.agregarMedico = (medico,callback)=>{
  var sql = 'INSERT INTO medicos (cedula, nombres, apellidos, tarj_profecional, provedores_id, servicios_idservicios) VALUES (?, ?, ?, ?, ?, ?)';
  if(connection)
  {
    connection.query(sql,[medico.cedula,medico.nombre,medico.apellidos,medico.tarj_profecional,medico.provedores_id,medico.servicios_idservicios],(err,row)=>{
      if(err)
      {
        throw err
      }
      else
      {
        callback(null,{'agregado':true});
      }
    });
  }
};

module.exports = medicosModule;
