const mysql = require('mysql');
let moment = require('moment');
let citas = require('./citas');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'prevenirexpres'
});

let horarioModel = {};

horarioModel.agregarHorario = (horario,callback) =>
{
  var horas = horario.horas;
  if(connection)
  {
    var hsql = 'INSERT INTO horario (de_maniana,a_maniana,de_tarde,a_tarde,servicios_id_servicios) VALUES (?,?,?,?,?)';
    var sql='INSERT INTO semana(lunes,martes,miercoles,jueves,viernes,sabado,domingo,horario_idhorario) VALUES (?,?,?,?,?,?,?,?)';
      connection.query(hsql,[horas.m_de,horas.m_hasta,horas.t_de,horas.t_hasta,horario.id],(err,row)=>{
        if(err)
        {
          throw err
        }
        else
        {
          var idH = row.insertId;
          connection.query(sql,[horario.lunes,horario.martes,horario.miercoles,horario.jueves,horario.viernes,horario.sabado,horario.domingo,idH],(err,rows)=>{
            if(err){throw err;}
            else
            {
              callback(null,{'agregado':true});
            }
          })
        }

      });

  }
}

horarioModel.darDia = (fecha,callback)=>{
  var manana = [];
  var tarde = [];
  var derro = [];
  var horaD = 0;
  var hora = 0;
  moment.locale('es');

var dia = moment(fecha.fecha).format('dddd');
  // console.log(fecha.id);
//callback(null,dia);
 if(connection)
 {
   var sql = 'SELECT dias.*, horario.* from dias,horario WHERE dias.id_horario = horario.id_horario and dias.dia = ? and  id_servicios = ? '
   connection.query(sql,[dia,fecha.id],(err,row)=>{
     if(err){throw err}
     else
     {

       var hd = row[0];
       // console.log(hd);
       var m_de = fecha.fecha+" "+hd.de_maniana;
       var m_hasta = fecha.fecha+" "+hd.a_maniana;
       var t_de = fecha.fecha+" "+hd.de_tarde;
       var t_hasta = fecha.fecha+" "+hd.a_tarde;
       horaD = moment(m_de).format('YYYY-MM-DD HH:mm:ss');
       horaT = moment(t_de).format('YYYY-MM-DD HH:mm:ss');
       m_hasta = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
       t_hasta = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
       // console.log(horaD +" < "+ m_hasta);
       do {
         hora = moment(horaD).format('YYYY-MM-DD HH:mm:ss');
         manana.push({hora});
         horaD = moment(horaD).add(1,'hour');
         //console.log(horaD);

       } while (horaD.isBefore(m_hasta));
       hora = moment(m_hasta).format('YYYY-MM-DD HH:mm:ss');
       manana.push({hora});
       manana.id = 2;
       citas.countCitas(manana,(err,maniana)=>{
         derro.push({maniana});
         //console.log(derro[0]);
         hora=0;
                              do {
                                // console.log('////////////TARDE///////////')
                                  hora = moment(horaT).format('YYYY-MM-DD HH:mm:ss');
                                  tarde.push({hora});
                                  horaT = moment(horaT).add(1,'hour');
                                  // console.log(hora+"/"+horaT);
                              } while (horaT.isBefore(t_hasta));
                              hora = moment(t_hasta).format('YYYY-MM-DD HH:mm:ss');
                              tarde.push({hora});
                              tarde.id = 2;
                              citas.countCitas(tarde,(err,tardes)=>{
                                  derro.push({tardes});
                                  callback(null,derro);
                              });
       });
       //console.log(m_de)

       //callback(null,manana);

     }
   });
 }

}


module.exports = horarioModel;
