let mysql = require('mysql');
let config = require('../config');
let event = require('./eventos');
let moment = require('moment'); moment().utc(-5).format();
var Moment = require('moment-timezone'); Moment().tz('America/Bogota').format();
let ciclo = require('../controler/ciclos');
let email = require('./email');


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
    // console.log(cita.existe);
    if(cita.existe == true || cita.existe == 'true')
    {
      // console.log(cita);
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
      var benef = cita.benef;
      console.log(cita);
       if(benef.nuevo == true || benef.nuevo == 'true')
       {
         var consc = 'SELECT * from usuarios where cedula = ?';
           connection.query(consc,[benef.ident],(err,res2)=>{
             if(err){throw err}
             else
             {
               console.log(res2);
               if(JSON.stringify(res2)=='[]')
               {
                 console.log(benef);
                 var add = 'INSERT INTO usuarios (cedula, nombre, apellidos, telefono,telefonowatshapp,fecha_nacimiento,usuariosBf_id, parentescos_id_parentescos,id_pais) VALUES (?,?,?,?,?,?,?,?,?);';
                 connection.query(add,[benef.ident,benef.nombre,benef.apellidos,benef.tel,benef.tel,benef.fecha_n,benef.id_usu,benef.parent,benef.pais],(err,res)=>{
                 if(err){callback(null,err)}
                 else {
                 {
                   var eventss = {
                   color: cita.color,
                   start: starts,
                   end: ends,
                   usuario: res.insertId,
                   servicio: cita.servicio,
                   mascota:cita.mascota
                   };

                   console.log(res);
                 // callback(null,res)
                 event.agregarEvento(eventss,(err,resp)=>{
                   callback(null,resp);
                 });
                 }
                 }
                 });
               }
               else
               {
                 callback(null,[{cedula:true}]);
               }
             }
           });


       }
       else {
         var eventss = {
         color: cita.color,
         start: starts,
         end: ends,
         usuario: cita.usuario,
         servicio: cita.servicio,
         mascota:cita.mascota
         };
         // console.log(eventss);
         event.agregarEvento(eventss,(err,resp)=>{
           callback(null,resp);
         });

       }



    }
    else
    {
      console.log('///(/(/(/( CREANDO NUEVO PACIENTE))))');
      // let ins = "INSERT INTO usuarios (id,cedula, nombre, apellidos,telefono,fecha_nacimiento, parentescos_id_parentescos, id_pais) VALUES (?,?, ?, ?, ?, ?, ?, ?);"
      //agreagr member para que pueda tener usuario y contraseña
      ciclo.generaSalt((err,gen)=>{
        cod = gen;
      });
      // console.log(cod);
      var sql = "SELECT members.email FROM members WHERE email = ?;";
      connection.query(sql,[cita.correo],(err,rows)=>{
        if(err){throw err}
        else{
          console.log(rows);
          if(JSON.stringify(rows)=='[]')
          {

            var sql1 = 'INSERT INTO members (email, admin, password, salt) VALUES ( ?, ?, ?,?)';
            connection.query(sql1,[cita.correo,'false','donPass',cod],(err,row)=>{
              if(err)
              {
              throw err;
              }
              else {
                console.log('usuario creado');
                var usu = {
                          to:cita.correo,
                          pss:cod,
                          id:row.insertId
                          }
                          cita.id = usu.id;
                          console.log('guhgbhjbjhg guiy guygo uyg uyg ouyg yiug uig uig iugiu gui giuyg ');
                          console.log(cita.id);
                          console.log(usu.id);
                          email.BienvenidoBlock(usu,(err,ressp)=>{
                            if(ressp==true)
                                {
                                  // console.log(row.insertId);
                                let valido = {mensaje:'Usuario registrado con exito',existe:'false',ids:row.insertId};
                                // console.log('agregado');
                              }
                          });
                   }
            });


            let ins = 'INSERT INTO usuarios ( id,cedula, correo,nombre, apellidos, telefono, fecha_nacimiento, parentescos_id_parentescos, id_pais) VALUES ( ?,?, ?,?, ?, ?, ?, ?, ?);'
            connection.query(ins,[cita.id,cita.usuario,cita.correo,cita.nombres,cita.apellidos,cita.contacto,cita.fecha_nacimiento,17,47],(err,insert)=>{
              // console.log(insert);
              if(err){throw err;}
              else
              {
                // console.log(cita);
                console.log('/*/*/*/*/*/*AQUI YA AGREGO AL USUSARIO');

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

                // console.log(eventss);
                var benef = cita.benef;
                console.log(cita);

                 if(benef.nuevo == true || benef.nuevo == 'true')
                 {
                   var consc = 'SELECT * from usuarios where cedula = ?';
                     connection.query(consc,[benef.ident],(err,res2)=>{
                       if(err){throw err}
                       else
                       {
                         console.log(res2);
                         if(JSON.stringify(res2)=='[]')
                         {
                           console.log(benef);
                           var add = 'INSERT INTO usuarios (cedula, nombre, apellidos, telefono,telefonowatshapp,fecha_nacimiento,usuariosBf_id, parentescos_id_parentescos,id_pais) VALUES (?,?,?,?,?,?,?,?,?);';
                           connection.query(add,[benef.ident,benef.nombre,benef.apellidos,benef.tel,benef.tel,benef.fecha_n,insert.insertId,benef.parent,benef.pais],(err,res1)=>{
                           if(err){callback(null,err)}
                           else {
                           {
                             var events = {
                             color: cita.color,
                             start: starts,
                             end: ends,
                             usuario: res1.insertId,
                             servicio: cita.servicio,
                             mascota:cita.mascota
                             };

                             console.log(res1);
                           // callback(null,res)
                           event.agregarEvento(events,(err,resp)=>{
                             callback(null,resp);
                           });
                           }
                           }
                           });

                         }
                         else {
                           callback(null,[{cedula:true}]);
                         }
                       }
                     });

                 }
                 else
                 {
                   var eventss = {
                   color: cita.color,
                   start: starts,
                   end: ends,
                   usuario: insert.insertId,
                   servicio: cita.servicio,
                   mascota:cita.mascota
                   };

                   event.agregarEvento(eventss,(err,resp)=>{
                     callback(null,resp);
                   });
                 }


              }
            });
          }
          else
          {
            callback(null,[{correo:false}]);
          }
        }
      });

      // console.log('no existe el usuario');
      // console.log(cita);
    }

  }

};


citasIModule.citaMascotas = (cita,callback)=>{
  if(connection)
  {
      console.log(cita)
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
            console.log(insert.insertId);
            let ins_masc = 'INSERT INTO mascotas (especie, nombre, sexo, esterilizado, id_usuarios) VALUES (?, ?, ?, ?, ?);';
            connection.query(ins_masc,[cita.especie,cita.nombreMascota,cita.sexo,cita.esterilizado,insert.insertId],(err,inse_masc)=>{
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


//cambia las citas de eventos a la tabla de citas activas y las elimina
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
    var insrt = 'INSERT INTO citas_activas_masc ( color, start, end, id_mascotas, id_servicios ) SELECT color, start, end, id_mascotas, id_servicios FROM events_masc WHERE id_eventos = ?;';
    var dele = 'DELETE FROM events_masc WHERE id_eventos = ?;'
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


//devuelve las citas del povedor activas en usuarios y mascotas
citasIModule.citasProvAc = (prov,callback) =>{
  if(connection)
  {
    let jsonCitas = [];
    let sql = "SELECT citas_activas.*,CONVERT_TZ(citas_activas.start,'+00:00','+05:00') as start,CONVERT_TZ(citas_activas.end,'+00:00','+05:00') as end, usuarios.*, servicios.nombre as servicio, servicios_categoria.categoria_idcategoria as categoria  from citas_activas,servicios,usuarios, servicios_categoria WHERE citas_activas.usuarios_id = usuarios.id AND citas_activas.servicios_idservicios = servicios.id_servicios AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND servicios.id_provedores = ? ;";
    let masc = 'SELECT citas_activas_masc.*, mascotas.*,servicios.nombre as servicio, servicios_categoria.categoria_idcategoria as categoria FROM citas_activas_masc, mascotas,servicios, servicios_categoria WHERE citas_activas_masc.id_mascotas = mascotas.id_mascotas AND citas_activas_masc.id_servicios = servicios.id_servicios AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND servicios.id_provedores = ?;';
    connection.query(sql,[prov],(err,row)=>{
      if(err){throw err}
      else
      {
        jsonCitas.push(row);
        connection.query(masc,[prov],(err,row1)=>{
          if(err){throw err}
          else
          {
            jsonCitas.push(row1);
            callback(null,jsonCitas);
          }
        });
        // callback(null,row);
      }
    });
  }
};

citasIModule.cambioestadocitas = (activa,callback) =>{
if(connection){
  if(activa.cat != 20)
  {
  var sel = 'SELECT citas_activas.* FROM citas_activas, servicios WHERE citas_activas.estado = 1 AND citas_activas.servicios_idservicios = ? group by citas_activas.id_citas_activas;';
  var updt = 'UPDATE citas_activas SET estado = 1 WHERE id_citas_activas = ?;';
  }
  else
  {
    var sel = 'SELECT citas_activas_masc.* FROM citas_activas_masc, servicios WHERE citas_activas_masc.estado = 1 AND citas_activas_masc.id_servicios = ? group by citas_activas_masc.id_citas_activas;';
    var updt = 'UPDATE citas_activas_masc SET estado = 1 WHERE id_citas_activas = ?;';
  }
console.log(activa);
  connection.query(sel,[activa.idser],(err,resp)=>{

    if(err){throw err}
    else
    {
      console.log(resp);
      if (JSON.stringify(resp)=='[]')
      {
        console.log('no ahy citas');
        connection.query(updt,[activa.idca],(err,resp)=>{
          if(err)
          {
            throw err;
          }
          else
          {
            callback(null,{activa:false, activada:true});
          }
        });
      }
      else
      {
        console.log('si ahy citas');
      callback(null,{activa:true, activada:false})
      }

    }

  });

  }
};


citasIModule.finCita = (cita,callback)=>{
if(connection)
{
  if(cita.ctg!=20)
  {
    var ins = 'INSERT INTO historial (color,start,end,usuarios_id,servicios_idservicios,fue) SELECT color, start, end, usuarios_id, servicios_idservicios, ? FROM citas_activas WHERE citas_activas.id_citas_activas = ?;';
    var del = 'DELETE FROM citas_activas WHERE citas_activas.id_citas_activas = ?;';
  }
  else
  {
      var ins = 'INSERT INTO historial_masc (color,start,end,id_mascotas,id_servicios,fue) SELECT color, start, end,id_mascotas,id_servicios , ? FROM citas_activas_masc WHERE citas_activas_masc.id_citas_activas = ?;';
      var del = 'DELETE FROM citas_activas_masc WHERE citas_activas_masc.id_citas_activas = ?;';
  }
      connection.query(ins,[cita.fue,cita.idcta],(err,res)=>{
        if(err){throw err}
        else
        {
          console.log('Insertado');
          console.log(res);
            connection.query(del,[cita.idcta],(err,resp)=>{
              if(err){throw err}
              else
              {
                console.log('eliminado');
                console.log(resp);
                callback(null,{actualizado:true})
              }
            });
        }
      });

}

};

citasIModule.activasMedico = (id,callback) => {
if(connection)
{
  let jsonCitas = [];
  var sql = 'SELECT citas_activas.*, usuarios.*, servicios.nombre as servicio FROM citas_activas, servicios, usuarios WHERE citas_activas.servicios_idservicios = servicios.id_servicios AND citas_activas.usuarios_id = usuarios.id AND servicios.medico_id = ?;';
  var sql2 = 'SELECT citas_activas_masc.* FROM citas_activas_masc, servicios, medicos WHERE citas_activas_masc.id_servicios = servicios.id_servicios AND servicios.medico_id = ?;';
  connection.query(sql,[id],(err,row)=>{
    if(err){throw err}
    else
    {
      // callback(null,row);
      jsonCitas.push(row);
      connection.query(sql2,[id],(err,row2)=>{
        if(err){throw err}
        else
        {
          jsonCitas.push(row2);
          callback(null,jsonCitas)
        }
      });

    }
  });
}
};


citasIModule.citaActiva = (idser,callback)=>{
    if(connection)
    {
      let sel= 'SELECT citas_activas.id_citas_activas as idctv FROM citas_activas where citas_activas.estado= 1 AND citas_activas.servicios_idservicios = ?;'
      connection.query(sel,[idser],(err,row)=>{
        if(err){throw err}
        else
        {
          if(JSON.stringify(row)=='[]')
          {
            callback(null,row)
          }
          else
          {
          row = row[0];
          row = row.idctv;
          callback(null,row);
          }
        }
      });
    }
};






module.exports = citasIModule;
