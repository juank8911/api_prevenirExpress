let mysql =require('sync-mysql');
let config = require('../config');
let valida = require('./valida');

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
var sql = 'SELECT *, CONCAT(nombres," ",apellidos) as nombre FROM medicos, provedores_has_medicos WHERE provedores_has_medicos.id_cedula = medicos.cedula AND provedores_has_medicos.id_provedor = ?;';
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
  const vali = {
    email: medico.email,
    t_prof:medico.tarj_profecional
  };
  // console.log('valida');
  // console.log(vali);
  valida.validaMedico(vali,(err,res)=>{
    // console.log(res);
    if(res.existe==false)
    {
      if(connection)
    {
      // console.log(medico);
      let salt = 123456;
    var mem = 'INSERT INTO members (email, admin, password, salt) VALUES (?, ?, ?, ?);'
    var sql = 'INSERT INTO medicos ( cedula, nombres, apellidos, tarj_profecional, titulo,members_id) VALUES ( ?, ?, ?, ?, ?,?)';
    connection.query(mem,[medico.email,'medico',medico.pssw,salt],(err,mem)=>{
      if(err){throw err}
      else
      {
        console.log('member agregado con exito');
        // console.log(mem.insertId);
        connection.query(sql,[medico.cedula,medico.nombre,medico.apellidos,medico.tarj_profecional,medico.titulo,mem.insertId],(err,row)=>{
        if(err)
        {
        throw err
        }
        else
        {
          let ins = 'INSERT INTO provedores_has_medicos (id_provedor,id_cedula) VALUES (?,?);';
          connection.query(ins,[medico.provedores_id,medico.cedula],(err,ins)=>{
            if(err){throw err}
            else
            {
              callback(null,true);
            }
          });

        }
        });
      }
    });
    }
    }
    else
    {
      callback(null,res)
    }
  });

};


//Agregar un servicio al medico
medicosModule.agregarProvedor = (medico,callback) =>{
  if(connection)
  {
    let val = 'SELECT * FROM provedores_has_medicos WHERE id_provedor = ? AND id_cedula = ?'
    connection.query(val,[medico.provedores_id,medico.cedula],(err,vali)=>{
      if(err){throw err}
      else
      {
        if (JSON.stringify(vali)!='[]')
        {
          callback(null,{'existe':true});
        }
        else
        {
          let ins = 'INSERT INTO provedores_has_medicos (id_provedor,id_cedula) VALUES (?,?);';
          connection.query(ins,[medico.provedores_id,medico.cedula],(err,ins)=>{
            if(err){throw err}
            else
            {
              callback(null,true);
            }
          });
        }
      }
    });


  }
};



module.exports = medicosModule;
