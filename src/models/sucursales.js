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


};







module.exports = sucurModule;
