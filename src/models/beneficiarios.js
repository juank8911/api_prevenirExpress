let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
    host: config.domain,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let benefModule = {};

//agrega benedficiarios con los respectivos campos solicitados
benefModule.agregarBeneficiario = (benef,callback)=>{
  if(connection)
  {
    var add = 'INSERT INTO usuarios (id, cedula, nombre, apellidos, telefono, telefonowatshapp,feha_nacimiento,usuariosBf_id, parentescos_id_parentescos) VALUES (id, cd, nom, ape, tel, tel,fecha,benfid, paren);';
    connection.query(add,[],(err,res)=>{
      if(err){callback(null,err)}
      else {
        {
          callback(null,res)
        }
      }
    });
  }
};

benefModule.darBenefId = (id,callback)=>{
var sel = 'SELECT * FROM usuarios WHERE usuariosBf_id = ? and parentescos_id_parentescos != 17;'
if(connection)
{
  connection.query(sel,[id],(err,row)=>{
    if(err){callback(500,err)}
    else{callback(null,row)}
  });
}
};

module.exports = benefModule;
