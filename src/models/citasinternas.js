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
    console.log(cita.existe);
    if(cita.existe == true || cita.existe == 'true')
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
      let ins = 'INSERT INTO usuarios ( cedula, nombre, apellidos, telefono, fecha_nacimiento, parentescos_id_parentescos, id_pais) VALUES ( ?, ?, ?, ?, ?, ?, ?);'
      connection.query(ins,[cita.usuario,cita.nombres,cita.apellidos,cita.contacto,cita.fecha_nacimiento,17,47],(err,insert)=>{
        // console.log(insert);
        if(err){throw err;}
        else
        {
          // console.log(cita);
          console.log('/*/*/*/*/*/*AQUI YA AGREGO AL USUSARIO');
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
          usuario: insert.insertId,
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


citasIModule.citaMascotas = (cita,callback)=>{
  if(connection)
  {
      // console.log(cita)
      if(cita.existe == true)
      {
          if(cita.existem == true )
          {
            console.log('existe  la mascota y el usuario');
            console.log(cita);
            // console.log(inse_masc);
              //*****************************************************************************************************//
              console.log(cita);
              // console.log(insert);
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
              usuario: cita.id_mascota,
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
            console.log('***********//////////////////*************');
            console.log('no existe  la mascota pero si e el usuario');
            console.log(cita.fecha_nacimiento);
            console.log(cita);
            let ins_masc = 'INSERT INTO mascotas (especie, raza, color, nombre, sexo, fecha_nacimineto, esterilizado, id_usuarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

            connection.query(ins_masc,[cita.especie,cita.raza,cita.colorMascota,cita.nombreMascota,cita.sexo,cita.fecha_nacimiento,cita.esterilizado,cita.usuario],(err,inse_masc)=>{
            if(err){throw err}
            else
            {
              console.log(inse_masc);
                //*****************************************************************************************************//
                // console.log(cita);
                // console.log(insert);
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
                usuario: inse_masc.insertId,
                servicio: cita.servicio,
                mascota:cita.mascota
                };
                console.log(eventss);
                event.agregarEvento(eventss,(err,resp)=>{
                  callback(null,resp);
                });
            }
            });
          }

      }
      else
      {
        let ins = 'INSERT INTO usuarios ( cedula, nombre, apellidos, telefono, fecha_nacimiento, parentescos_id_parentescos, id_pais) VALUES ( ?, ?, ?, ?, ?, ?, ?);'
        connection.query(ins,[cita.usuario,cita.nombres,cita.apellidos,cita.contacto,cita.fecha_nacimiento,17,47],(err,insert)=>{
          if(err){throw err;}
          else
          {
            let ins_masc = 'INSERT INTO mascotas (especie, nombre, sexo, esterilizado, id_usuarios) VALUES (?, ?, ?, ?, ?);';
            connection.query(ins_masc,[cita.especie,cita.nombreMascota,cita.sexo,cita.esterilizado,cita.usuario],(err,inse_masc)=>{
              if(err)
              {
                throw err
              }
              else
              {
                  console.log(inse_masc);
                    //*****************************************************************************************************//
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
                    usuario: inse_masc.insertId,
                    servicio: cita.servicio,
                    mascota:cita.mascota
                    };
                    console.log(eventss);
                    event.agregarEvento(eventss,(err,resp)=>{
                      callback(null,resp);
                    });
              }

          });
        }
      });
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
  let ids = parseInt(id.ids);
  console.log(id.masc);
  if(connection)
  {
    if(id.masc == true || id.masc =='true')
    {
        // console.log('con mascotas');
          var sel = "SELECT * FROM usuarios WHERE cedula = ?;";
          var masc = 'SELECT * FROM mascotas WHERE id_usuarios = ?;'
    }
    else
    {
        // console.log('sin mascotas');
          var sel = "SELECT * FROM usuarios WHERE cedula = ?;";
    }
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
              if(id.masc == true || id.masc =='true')
              {
                // console.log('buscando mascotas');
                // console.log(row[0].id);
                connection.query(masc,[row[0].id],(err,ms)=>{
                  if(err){throw err}
                  else
                  {
                    // console.log(ms);
                    row[0].masc = ms;
                    callback(null,row)
                  }
                });
              }
              else
              {
              callback(null,row);
              }

            }
          }

      }
    });
  }
};

citasIModule.activaCitaP = (cita,callback) =>{
  if(connection){
    console.log('********///////////////////');
    console.log(cita);
  if (cita.id_ctga != 20)
  {
    console.log('cita de usuario')
    var insrt = 'INSERT INTO citas_activas (color, start, end , usuarios_id, servicios_idservicios ) select events.color, events.start, events.end, events.usuarios_id, events.servicios_idservicios FROM events WHERE events.id_eventos = ?;';
    // var hist = 'INSERT INTO historial (color,start, end, usuarios_id, servicios_idservicios, calificada, fue)  SELECT events.color ,events.start, events.end, events.usuarios_id, events.servicios_idservicios, events.calificada, ? as fue FROM events WHERE events.id_eventos = ? ;';
    var dele = 'DELETE FROM events WHERE events.id_eventos = ?;';
  }
  else
  {
  console.log('cita de mascota');
  }
    connection.query(insrt,[cita.id_eve],(err,row)=>{
      if(err)
      {
        throw err;
      }
      else
      {
        connection.query(dele,[cita.id_eve],(err,res1)=>{
          if(err){throw err}
          else
          {
                console.log(res1)
                callback(null,true)

            }});}});}};

citasIModule.citasProvAc = (prov,callback) =>{
  if(connection)
  {
    let sql = 'SELECT citas_activas.* from citas_activas,servicios WHERE citas_activas.servicios_idservicios = servicios.id_servicios AND servicios.id_provedores = ?;';
    connection.query(sql,[prov],(err,row)=>{
      if(err){throw err}
      else
      {
        callback(null,row);
      }
    });
  }
};



module.exports = citasIModule;
