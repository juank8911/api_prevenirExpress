let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
    host: config.domain,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let validamodel = {};

//valida el email y el id de los usuarios no exixsta en la base de datos
validamodel.vRegistro = (val,callback) =>{
if(connection)
{
  var email = val.email;
  var id = val.id;
  console.log(val);
  var sql = 'SELECT * FROM members WHERE id = ?;';
  connection.query(sql,[id],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      let usu = row[0];
      console.log(row[0]);
      if (JSON.stringify(row)=='[]')
      {
          var em = 'SELECT * FROM members WHERE email = ?;';
          connection.query(em,[email],(err,rows)=>{
            if(err)
            {
              throw err;
            }
            else
            {
              if (JSON.stringify(row)=='[]')
              {
                console.log('usuario no existe');
                callback(null,{'existe':'false'});
              }
              else
              {
                callback(null,{'existe':'true','campo':'email'});
              }
            }
          });

      }
      else
      {
      console.log('validacion de campos',usu);
      callback(null,{'existe':'true','campo':'id'});
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
