let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let sucurModule = {};

sucurModule.agregarSucursales = (sucrs,callback)=> {

if(connection)
{
  var sql = 'INSERT INTO sucursales (nombre, direccion, telefono, id_municipio, id_provedor) VALUES (?, ?, ?, ?, ?);'
  var p=0;
  var ids=[];
console.log(sucrs.length);
for (var i = 0; i < sucrs.length; i++) {
  let sucr = sucrs[i];
  connection.query(sql,[],(err,res)=>{
    if(err){throw err}
    else
    {
      ids.push({res.insertId});
      p++
    }
  });
  if(p>=sucrs.length)
  {
    callback(null,ids);
  }
}


}

};







module.exports = sucurModule;
