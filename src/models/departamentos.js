let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
    host: config.domain,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});


let departModel = {};


departModel.darDepartamentos = (id,callback)=>{
  if(connection)
  {
    var sql = 'SELECT id_departamento,nombre FROM departamento WHERE pais_id = ?'
    connection.query(sql,[id],(err,row)=>{
        if(err)
        {
          throw err
        }
        else
        {
          callback(null,row);
        }
    });
  }
};


module.exports = departModel;
