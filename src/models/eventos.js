let mysql =require('mysql');
let config = require('../config');


connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let eventmodule = {};

eventmodule.darEvents = (callback) =>{
  if(connection)
  {
    var sql = 'SELECT events.*, servicios.nombre FROM events, servicios WHERE events.servicios_idservicios = servicios.id_servicios;';
    connection.query(sql,(err,row)=>{
      if(err){throw err}
      else
      {

        callback(null,row);
      }
    });
  }
};

eventmodule.darEventsIdUsuario=(id,callback)=>{
  if(connection)
  {
    var sql = 'SELECT events.*, servicios.nombre FROM events, servicios WHERE events.servicios_idservicios = servicios.id_servicios AND events.usuarios_id = ?;';
    connection.query(sql,id,(err,row)=>{
      if(err){throw err}
      else
      {
        console.log('prueba de git');
      callback(null,row);
      }
    });
  }
};

eventmodule.agregarEvento = (events,callback) =>{
  if(connection){
    var sql = 'INSERT INTO events(color,start,end,usuarios_id,servicios_idservicios) VALUES (?,?,?,?,?)';
    connection.query(sql,[events.color,events.start,events.end,events.usuario,events.servicio],(err,row)=>{
      if(err){throw err}
      else
      {
        callback(null,{'agregado':true});
      }
    });
  }
};


module.exports = eventmodule;
