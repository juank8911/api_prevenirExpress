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
var sql = 'INSERT INTO dias(dia,id_horario) value (?,?)';
diasModel.agregarDia=(dia,callback)=> {
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


diasModel.controlH=(horario,callback)=>{

  //console.log(req.body);
  horarios = horario;
    console.log(horarios);
  //id=horario.id;
  //semana = horario.semana;
    console.log(horarios.length);
  //  console.log(id);
   for (var i = 0; i < horarios.length; i++)
    {
      // console.log("horarios nuemro" + i);
      // console.log(horarios[i]);
      var horas = horarios[i];
      horas.id =   horarios.id;
      console.log(horas);
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

    }
};

module.exports = diasModel;
