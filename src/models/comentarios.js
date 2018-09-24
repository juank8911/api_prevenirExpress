let mysql =require('mysql');
let config = require('../config');


connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let comentmodule = {};

comentmodule.agregarComentario(coment,callback)
{
  if(connection)
  {
    // var sql = 'SELECT'
  }
}





module.exports = comentmodule;
