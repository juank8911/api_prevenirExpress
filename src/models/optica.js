let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let optModule = {};

optModule.darDatosOptUsu = (callback) => {
var sql = 'SELECT * FROM historia_opt WHERE id_usuario = ?;';
connection.query(sql,(err,row)=>{
  if(err){throw err}
  else
  {
    callback(null,row);
  }
})

};

optModule.createHistUsu = (callback) => {

};

optModule.darDatosUsu = (callback) =>{
  
};
