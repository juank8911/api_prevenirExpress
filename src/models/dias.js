const mysql = require('mysql');
let config = require('../config');
let moment = require('moment');
let hora = require('./horario');

connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let diasModel={};

// agrega los dias la base de datos
diasModel.agregarDia=(dia,callback)=> {
  var sql = 'INSERT INTO dias(dia,id_horario) value (?,?)';
semana=dia.semanas;
id = dia.id;
var fin = [];
var p=0;
for (var i = 0; i < semana.length; i++)
{
  //console.log(semana[i]);
  connection.query(sql,[semana[i],id],(err,resp)=>{
    if(err){throw err}
    else
    {
      fin.push({id:resp.insertId});
      console.log(fin);
      console.log(p);
       p++;
      if(p>=semana.length)
      {
        callback(null,fin);
      }
    }
  });

}
};


// retorna los dias de la semana
diasModel.controlH=(horario,callback)=>{

  //console.log(req.body);
  var id = horario.id;
  horarios = horario[0];
  horarios = horarios.horario;
  //horarios = horarios.horario;
    console.log(horarios);
  //id=horario.id;
  //semana = horario.semana;
    //console.log(horarios.length);
  //  console.log(id);
   for (var i = 0; i < horarios.length; i++)
    {
      // console.log("horarios nuemro" + i);
      // console.log(horarios[i]);
      var horas = horarios[i];
      horas.id =   id;
      console.log(horas.semana);
      hora.darDia(horas,(err,resp)=>{
        respuesta.push(resp);
        console.log(p);
         p++;
        if(p>=horarios.length)
        {
          res.json(respuesta);
        }
      });
////////////////////////////////////////////////////
// hora.agregarHorario(horas,(err,resp)=>{
//      respuesta.push(resp);
//      console.log(p);
//       p++;
//      if(p>=horarios.length)
//      {
//        res.json(respuesta);
//      }
//
// });
/////////////////////////////////////////
    }
};

module.exports = diasModel;
