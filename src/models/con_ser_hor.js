let mysql = require('mysql');
let config = require('../config');
var forEach = require('async-foreach').forEach;

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let cshModule = {};

//agrega los id de los horarios servisios y consultorios a la tabla con_ser_hor de la base de datos
cshModule.agregaids = (ids,callback) =>{
  var p =0;
if(connection)
{
  console.log('AGREGANDO LOS IDS DE CONSULTORIOS');
  console.log(ids);
  var sql = 'INSERT INTO con_ser_hor(id_consultorio, id_servicios, id_horario) VALUES (?, ?, ?);';
  var resp = [];
// console.log('agregando ids');
// console.log(ids);
  forEach(ids, function(id, index, arr)
{
  // console.log('INSERT INTO con_ser_hor(id_consultorio, id_servicios, id_horario) VALUES (',id.id_consul, id.id_ser, id.id_hora,')');
  connection.query(sql,[id.id_consul, id.id_ser, id.id_hora],(err,res)=>{
      if(err){throw err}
      else {
        {
          // console.log(res);
          // resp.push(res);
          p++;
          // console.log(p,'id contra length  ',ids.length );
          if(p>=ids.length)
          {
            callback(null,true)
          }
        }
      }
  });
})

}

};




module.exports = cshModule;
