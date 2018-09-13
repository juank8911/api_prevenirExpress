let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
    host: config.domain,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let parentModule = {};

parentModule.darParent = (callback)=>{
  if(connection)
  {
    connection.query('SELECT id_parentescos, nombre FROM parentescos;',(err,row)=>{
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
