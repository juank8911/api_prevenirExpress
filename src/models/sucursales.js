let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let sucurModule = {};

sucurModule.agregarSucursales = (,callback)=> {

if(connection)
{
  var sql = 'INSERT INTO sucursales (nombre, direccion, telefono, id_municipio, id_provedor) VALUES (?, ?, ?, ?, ?);'
}

};







module.exports = sucurModule;
