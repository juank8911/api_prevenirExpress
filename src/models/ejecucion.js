const mysql = require('mysql');
let config = require('../config');
let moment = require('moment');

connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});


let ejectModel = {};

ejectModel.darLibres = (serv,callback)=>
{
  //console.log(serv);
  if(connection)
  {
    var sql = 'SELECT servicios.max_citas_ves-count(events.id_eventos) as libres  FROM servicios, events WHERE servicios.id_servicios = events.servicios_idservicios and start = ? AND servicios_idservicios = ? ;'
    connection.query(sql,[serv.hora,serv.id],(err,res)=>{
      res = res[0];
      res=res.libres;
      //console.log('///////////****//////////');
      //console.log(res);
      serv.libres = res;
      serv.disponible = true;
      serv.hora = moment(serv.hora).format('hh:mm a');

      //console.log(serv);
      callback(null,serv);
    });

  }
}

module.exports = ejectModel;
