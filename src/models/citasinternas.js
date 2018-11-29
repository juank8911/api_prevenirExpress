let mysql = require('mysql');
let config = require('../config');
let event = require('./eventos');
let moment = require('moment');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let citasIModule = {};


//agrga una nueva cita para el servicio agragando o no un nuevo usuario
citasIModule.nuevaCita = (cita,callback)=>{
  if(connection)
  {
    if(cita.existe == true)
    {
      console.log(cita);
      var Mend = parseInt(00);
      var hinicio = moment(cita.start).format('HH:mm:ss');
      var Finicio = moment(cita.start).format('YYYY-MM-DD');
      var horas = hinicio.split(":");
      var mins = horas[1];
      var hora = horas[0];
      hora = parseInt(hora);
      mins = parseInt(mins);
      minsEnd = mins+Mend;
      hora = hora;
      var Hstart = hora+":"+"00"+":00";
      var Hend = hora+1+":"+"00"+":00";
      var starts = Finicio+" "+Hstart;
      var ends = Finicio+" "+Hend;
      //var Hend = moment(ends).format('YYYY-MM-D HH:mm:ss');
      var eventss = {
      color: cita.color,
      start: starts,
      end: ends,
      usuario: cita.usuario,
      servicio: cita.servicio,
      mascota:cita.mascota
      };
      console.log(eventss);
      event.agregarEvento(eventss,(err,resp)=>{
        callback(null,resp);
      });
    }
    else
    {
      // let ins = "INSERT INTO usuarios (id,cedula, nombre, apellidos,telefono,fecha_nacimiento, parentescos_id_parentescos, id_pais) VALUES (?,?, ?, ?, ?, ?, ?, ?);"
      let ins = 'INSERT INTO usuarios (id, cedula, nombre, apellidos, telefono, fecha_nacimiento, parentescos_id_parentescos, id_pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
      connection.query(ins,[cita.usuario,cita.usuario,cita.nombres,cita.apellidos,cita.contacto,cita.fecha_nacimiento,17,47],(err,insert)=>{
        if(err){throw err;}
        else
        {
          console.log(cita);
          console.log(insert);
          var Mend = parseInt(00);
          var hinicio = moment(cita.start).format('HH:mm:ss');
          var Finicio = moment(cita.start).format('YYYY-MM-DD');
          var horas = hinicio.split(":");
          var mins = horas[1];
          var hora = horas[0];
          hora = parseInt(hora);
          mins = parseInt(mins);
          minsEnd = mins+Mend;
          hora = hora;
          var Hstart = hora+":"+"00"+":00";
          var Hend = hora+1+":"+"00"+":00";
          var starts = Finicio+" "+Hstart;
          var ends = Finicio+" "+Hend;
          //var Hend = moment(ends).format('YYYY-MM-D HH:mm:ss');
          var eventss = {
          color: cita.color,
          start: starts,
          end: ends,
          usuario: cita.usuario,
          servicio: cita.servicio,
          mascota:cita.mascota
          };
          console.log(eventss);
          event.agregarEvento(eventss,(err,resp)=>{
            callback(null,resp);
          });

        }
      });
      console.log('no existe el usuario');
      console.log(cita);
    }

  }

};

citasIModule.darUsuarios = (callback)=>{
  if(connection)
  {
    var sel = 'SELECT cedula, nombre FROM usuarios'
    connection.query(sel,(err,row)=>{
      if(err){throw err}
      else
      {
        // console.log(row);
        callback(null,row);
      }
    });
  }
};

citasIModule.darUsuariosID = (id,callback)=>{
  let ids = parseInt(id);
  if(connection)
  {
    var sel = "SELECT * FROM usuarios WHERE cedula = ?;";
    connection.query(sel,ids,(err,row)=>{
      if(err){throw err}
      else
      {
        console.log(row);
          if (JSON.stringify(row)=='[]')
          {
            callback(null,false);
          }
          else {
            {
                callback(null,row);
            }
          }

      }
    });
  }
};

module.exports = citasIModule;
