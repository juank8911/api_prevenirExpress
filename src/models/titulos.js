let mysql = require('mysql');
let config = require('../config');


connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let tituloModule = {};

tituloModule.agregarTitulos = (titulos,callback)=>{
  if(connection)
  {
    let p = 1;
    let ins = 'INSERT INTO titulos (nombre, institucion, start, end, medico_id) VALUES (?, ?, ?, ?, ?);';
    for (var i = 0; i < titulos.length; i++) {
      let titulo = titulos[i];
      connection.query(ins,[titulo.nombre,titulo.institucion,titulo.start,titulo.end,titulo.id],(err,res)=>{
        if(err){throw err}
        else
        {

          if(p==titulos.length)
          {
            callback(null,true)
          }
          p++;
        }
      });


    }
  }
};


module.exports = tituloModule;
