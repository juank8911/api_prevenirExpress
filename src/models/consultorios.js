let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let consulModule = {};

app.post('/addconsul')

consulModule.insertConsul = (consuls,callback)=>{
if(connection)
{
  var sql = 'INSERT INTO consultorio (nombre, extencion, medico_id, id_sucursales) VALUES (?, ?, ?, ?);';
  for (var i = 0; i < consuls.length; i++) {
    var consul = consuls[i];
    console.log(consul);
  }

}

};
