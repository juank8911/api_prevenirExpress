let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
    host: config.domain,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let parentModule = {};

//retorna una lista de parentescos posibles de la base de datos
parentModule.darParent = (callback)=>{
  if(connection)
  {
    connection.query('SELECT id_parentescos, nombre FROM parentescos where id_parentescos != 17;',(err,row)=>{
      if(err)
      {
        throw err;
      }
      else {
        {
          callback(null,row);
        }
      }
    });
  }
};

module.exports = parentModule;
