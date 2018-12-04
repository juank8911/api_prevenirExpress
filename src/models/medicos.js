let mysql =require('sync-mysql');
let config = require('../config');

connection = new mysql({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let medicosModule = {};

//devuelve medico por el id del provedor
medicosModule.darMedicosProv = (id, callback)=>{
if(connection)
{
var sql = 'SELECT *, CONCAT(nombres," ",apellidos) as nombre FROM medicos WHERE provedores_id = ?';
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

//Busca el medico por su cedula y lo devuelve en caso contrario retorna false
medicosModule.buscarMedicoId = (id,callback)=>{
if(connection)
{
  let sel = 'SELECT * FROM medicos where cedula = ?';
  connection.query(sel,[id],(err,row)=>{
    if(err){throw err}
    else
    {
      if (JSON.stringify(row)=='[]')
      {
        callback(null,false);
      }
      else
      {
        callback(null,row);
      }
    }
  });
}
};

//agrega el medico a la base de datos creando su usario para login con contraseña
medicosModule.agregarMedico = (medico,callback)=>{
  if(connection)
{
  console.log(medico);
  let salt = 123456;
var mem = 'INSERT INTO members (email, admin, password, salt) VALUES (?, ?, ?, ?);'
var sql = 'INSERT INTO medicos ( cedula, nombres, apellidos, tarj_profecional, titulo,provedores_id,members_id) VALUES (?, ?, ?, ?, ?, ?,?)';
connection.query(mem,[medico.email,'medico',medico.pssw,salt],(err,mem)=>{
  if(err){throw err}
  else
  {
    console.log('member agregado con exito');
    console.log(mem.insertId);
    connection.query(sql,[medico.cedula,medico.nombre,medico.apellidos,medico.tarj_profecional,medico.titulo,medico.provedores_id,mem.insertId],(err,row)=>{
    if(err)
    {
    throw err
    }
    else
    {
    callback(null,true);
    }
    });
  }
});
}
};



module.exports = medicosModule;
