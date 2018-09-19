const mysql = require('mysql');
let moment = require('moment');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'prevenirexpres'
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
      serv.hora = moment(serv.hora).format('hh:mm a');
      
      //console.log(serv);
      callback(null,serv);
    });

  }
}

module.exports = ejectModel;
