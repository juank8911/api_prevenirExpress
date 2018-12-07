let mysql =require('sync-mysql');
let config = require('../config');
let valida = require('./valida');
let service = require('./services');

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
var sql = 'SELECT *, CONCAT(nombres," ",apellidos) as nombre FROM medicos, provedores_has_medicos WHERE provedores_has_medicos.medico_id = medicos.medico_id AND provedores_has_medicos.id_provedor = ?;';
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
medicosModule.buscarMedicoCedu = (cedu,callback)=>{
if(connection)
{
  let sel = 'SELECT * FROM medicos where cedula = ?';
  connection.query(sel,[cedu],(err,row)=>{
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



//Busca el medico por su id de medico y lo devuelve en caso contrario retorna false
medicosModule.buscarMedicoId = (id,callback)=>{
if(connection)
{
  let sel = 'SELECT * FROM medicos where medico_id = ?';
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


medicosModule.getMedicoMem = (id,callback)=>{
  if(connection)
  {
      let get = 'SELECT medicos.*,members.email FROM medicos,members WHERE medicos.members_id = members.id AND medicos.members_id = ?;';
      connection.query(get,[id],(err,res)=>{
        if(err){throw err}
        else
        {
          callback(null,res)
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
  console.log('valida');
  console.log(vali);
  valida.validaMedico(vali,(err,res)=>{
    console.log(res);
    if(res.existe==false)
    {
      if(connection)
    {
      // console.log(medico);
      let salt = 123456;
    var mem = 'INSERT INTO members (email, admin, password, salt) VALUES (?, ?, ?, ?);'
    var sql = 'INSERT INTO medicos (medico_id, cedula, nombres, apellidos, tarj_profecional, titulo,members_id) VALUES ( ?,?, ?, ?, ?, ?,?)';
    connection.query(mem,[medico.email,'medico',medico.pssw,salt],(err,mem)=>{
      if(err){throw err}
      else
      {
        console.log('member agregado con exito');
        // console.log(mem.insertId);
        connection.query(sql,[mem.insertId,medico.cedula,medico.nombre,medico.apellidos,medico.tarj_profecional,medico.titulo,mem.insertId],(err,row)=>{
        if(err)
        {
        throw err
        }
        else
        {
          let ins = 'INSERT INTO provedores_has_medicos (id_provedor,medico_id) VALUES (?,?);';
          connection.query(ins,[medico.provedores_id,mem.insertId],(err,ins)=>{
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
      console.log(res);
      callback(null,res)
    }
  });

};


//Agregar un servicio al medico
medicosModule.agregarProvedor = (medico,callback) =>{
  if(connection)
  {
    let val = 'SELECT * FROM provedores_has_medicos WHERE id_provedor = ? AND medico_id = ?'
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
          let ins = 'INSERT INTO provedores_has_medicos (id_provedor,medico_id) VALUES (?,?);';
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

medicosModule.provedorServicios = (id,callback)=>{
if(connection)
{
  let p = 1;
  // let servi;
  let res = [];
  // console.log(id);
  let prov = 'SELECT provedores.nombre as provedor, provedores.id_provedor as idp from provedores, provedores_has_medicos WHERE provedores.id_provedor = provedores_has_medicos.id_provedor and provedores_has_medicos.medico_id = ?;';
  connection.query(prov,[id],(err,pr)=>{
    if(err){throw err}
    else
    {
      // console.log(pr);
      if (JSON.stringify(pr)=='[]')
      {
        callback(null,false)
      }
      else
      {
        // console.log('ENTRANDO AL FOR');
        // console.log(pr.length);
        for (var i = 0; i < pr.length; i++)
        {
            pr[i].id = id;
           // console.log('IDS LIB //*********');
            // console.log(pr);
            service.serviciosMedicoProv(pr[i],(err,serv)=>{
              // console.log(serv);
              res.push(serv);
              if(p==pr.length)
              {
                callback(null,res)
              }
              p++
            });
        }

      }
    }
  });
}
};


medicosModule.setMedico = (medico,callback) =>{
  if(connection)
  {
    let upd = 'UPDATE medicos SET nombres = ?, apellidos = ?, titulo = ?, telefono = ?, whatsapp = ? WHERE (medico_id = ?);';
    connection.query(upd,[medico.nombres,medico.apellidos,medico.titulo,medico.telefono,medico.wp,medico.id],(err,rep)=>{
      if(err){throw err}
      else
      {
        callback(null,true);
      }
    });
  }
};

module.exports = medicosModule;
