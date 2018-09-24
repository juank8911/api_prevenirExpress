const mysql = require('mysql');
let config = require('../config');
let moment = require('moment');
let citas = require('./citas');
let dia = require('./dias');

connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let horarioModel = {};

horarioModel.agregarHorario = (horario,callback) =>
{
  var horas = horario;
  var semana = horas.semana;
  var dias={};
  //console.log(semana);
   if(connection)
   {
     var hsql = 'INSERT INTO horario (de_maniana,a_maniana,de_tarde,a_tarde,id_servicios) VALUES (?,?,?,?,?)';

       connection.query(hsql,[horas.m_de,horas.m_hasta,horas.t_de,horas.t_hasta,horas.id],(err,row)=>{
         if(err)
         {
           throw err
         }
         else
         {

           var idH = row.insertId;
           dias={
             semanas:semana,
             id:idH
           };
          // console.log(dias);
           dia.agregarDia(dias,(err,resp)=>{
               callback(null,{'res':resp});
           });


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
       console.log(dia);
       if (JSON.stringify(row)=='[]') {
          //execute
          console.log('vacio');
          callback(null,[{'maniana':[{"hora": "no ahy citas disponibles",'disponible':false},]},{'tardes':[{"hora": "no ahy citas disponibles",'disponible':false},]}]);
}
      else
{       var hd = row[0];
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
       manana.push({hora,'disponible':true});
       manana.id = parseInt(fecha.id);
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
                              tarde.id = parseInt(fecha.id);
                              citas.countCitas(tarde,(err,tardes)=>{

                                  derro.push({tardes});
                                  callback(null,derro);
                              });
       });
       //console.log(m_de)

       //callback(null,manana);
}
     }
   });
 }

}


module.exports = horarioModel;
