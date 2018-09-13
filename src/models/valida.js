let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
    host: config.domain,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let validamodel = {};

validamodel.vRegistro = (val,callback) =>{
if(connection)
{
  var email = val.email;
  var id = val.id;
  console.log(val);
  var sql = 'SELECT * FROM members WHERE (id = ? OR email = ?);';
  connection.query(sql,[id,email],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      let usu = row[0];
      console.log(row[0]);
      if(usu==null)
      {
        console.log('usuario no existe');
        callback(null,{'existe':'false'});
      }
      else
      {
      console.log('validacion de campos',usu);
      callback(null,{'existe':'true'});
      }


    }
  });
}
else
{
res.json({'mensaje':'no ahy conexion a la base de datos'});
}
};



module.exports = validamodel;
