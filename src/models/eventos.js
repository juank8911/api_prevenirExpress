let mysql =require('mysql');
let config = require('../config');
var moment = require('moment');


connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let eventmodule = {};

// retorna todos los eventos
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
//retorna una lista de eventos por ususario
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

//retorna una lista de eventos por servicio
eventmodule.darEventsIdService = (ids,callback)=>{
  if(connection)
  {
    var sql = 'SELECT events.*, servicios.nombre FROM events, servicios WHERE events.servicios_idservicios = servicios.id_servicios AND events.servicios_idservicios = ?;';
    connection.query(sql,ids,(err,row)=>{
      if(err){throw err}else{callback(null,row);}
    })
  }
};

//agrega los eventos a la base de datos
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





// ELIMINA UN EVENTO DE LA BASE DE DATOS
eventmodule.eliminarEvento = (id,callback) =>{
  var now = moment().format('YYYY-MM-DD hh:mm:ss a');
      console.log('hoy'+now);
  if(connection)
  {
    var valida = 'SELECT start FROM events WHERE id_eventos = ?';
    connection.query(valida,id,(err,resp)=>{
      resp = resp[0];
      resp = resp.start
      resp = moment(resp).format('YYYY-MM-DD hh:mm:ss a');
      console.log('original'+resp);
      resp =  moment(resp).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss a');
      console.log('resta'+resp);
      if(moment(now).isSameOrBefore(resp))
      {
          var del = ' DELETE FROM events where id_eventos = ?';
          connection.query(del,[id],(err,row)=>{
            if(err){throw err}else{callback(null,{'borrado':true});}
          });
      }
      else
      {
        callback(null,{'borrado':false})

      }

    });
  }
};

eventmodule.delEventProv = (ev,callback)=>{
  if(connection)
  {
    var sel = 'SELECT servicios.id_servicios FROM servicios,provedores, events where servicios.id_provedores = provedores.id_provedor and servicios.id_servicios = events.servicios_idservicios and provedores.id_provedor = ? and events.id_eventos = ? limit 1 ';
    connection.query(sel,[ev.idp,ev.ide],(err,row)=>{
      if(err){throw err}
      else
      {
        row = row[0];
        // console.log(row.id_servicios);
        var sql = 'DELETE FROM events where events.id_eventos = ? AND servicios_idservicios = ? ;';
        connection.query(sql,[ev.ide,row.id_servicios],(err,row)=>{
          if(err){throw err}
          else
          {
            callback(null,{'borrado':true})
          }
        });
      }
    });

  }
};


eventmodule.citaHistorial = (callback)=>{
  if(connection)
  {
    var h = moment().format('YYYY-MM-DD HH:mm:ss');
    var citas = 'insert into historial SELECT * FROM events WHERE end < ?;'
    var del = 'DELETE FROM events WHERE end < ?;'
    connection.query(citas,[h],(err,res)=>{
      if(err){throw err}
      else
      {
        connection.query(del,[h],(err,resp)=>{
          if(err){throw err}
          else
          {
            console.log(h);
            callback(null,'eliminado');
          }
        });
      }
    });
  }
};



module.exports = eventmodule;
