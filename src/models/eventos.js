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
    var sql = 'SELECT events.*, servicios.nombre FROM events, servicios WHERE events.servicios_idservicios = servicios.id_servicios AND events.usuarios_id = ? ORDER BY events.start asc;';
    connection.query(sql,id,(err,row)=>{
      if(err){throw err}
      else
      {
        //console.log('prueba de git');
      callback(null,row);
      }
    });
  }
};

eventmodule.darEventsIdService = (ids,callback)=>{
  if(connection)
  {
    var sql = 'SELECT events.*, servicios.nombre FROM events, servicios WHERE events.servicios_idservicios = servicios.id_servicios AND events.servicios_idservicios = ?;';
    connection.query(sql,ids,(err,row)=>{
      if(err){throw err}else{callback(null,row);}
    })
  }
};

eventmodule.agregarEvento = (events,callback) =>{
  if(connection){
    console.log(events);
    var valida = 'SELECT createdAT,start FROM events where usuarios_id = ? and DATE(start) = DATE(?); ';
    var sql = 'INSERT INTO events(color,start,end,usuarios_id,servicios_idservicios) VALUES (?,?,?,?,?)';
    connection.query(valida,[events.usuario,events.start],(err,res)=>{
      if(err){throw err}
      else {

              // res = res[0];
              console.log(res);
              if(JSON.stringify(res)=='[]')
              {
                connection.query(sql,[events.color,events.start,events.end,events.usuario,events.servicio],(err,row)=>{
                  if(err){throw err}
                  else
                  {
                    callback(null,[{'agregado':true}]);
                  }
                });

              }
              else{  console.log('vacio'); callback(null,[{'reservado':true}]);}
            }

    });
  }
};






eventmodule.eliminarEvento = (id,callback) =>{
  if(connection)
  {
    var sql = 'DELETE FROM events WHERE id_eventos=?';
    connection.query(sql,[id],(err,row)=>{
      if(err){throw err}
      else
      {
        row.delete = true;
        //console.log(row);
        callback(null,row);
      }
    });
  }
};


module.exports = eventmodule;
