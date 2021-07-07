let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let cateModule = {};


//retorna las caategorias que eisten para los servicios
cateModule.darCategoria = (callback)=>{
if(connection)
{
//console.lo.log('prueba');
var sql = 'SELECT id_categoria,nombre FROM categoria;';
connection.query(sql,(err,row)=>{
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


cateModule.prueba = (cal,callback)=>{
  // console.log('prueba de callbak');
  callback(null,true);
};

module.exports = cateModule;
