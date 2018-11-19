let mysql =require('mysql');
let config = require('../config');


connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let comentmodule = {};

// agrega un comentario por cita a la base de atos con la calificacion brindada por el ususario
comentmodule.agregarComentario = (coment,callback) =>
{
if(connection)
{
var ins = 'INSERT INTO comentarios (comentario, calificacion, servicios_idservicios, usuarios_id, historial_id_historial) VALUES (?, ?, ?, ?, ?);'
var prom = 'SELECT COUNT(calificacion) as cant,SUM(calificacion) as sum, ROUND(SUM(calificacion)/COUNT(calificacion)) as prom FROM comentarios WHERE servicios_idservicios=?;';
var upd1 = 'UPDATE servicios SET promedio=? WHERE id_servicios=?;';
var upd2 = 'UPDATE historial SET calificada=1 WHERE id_historial=?;';
connection.query(ins,[coment.comentario,coment.califica,coment.id_servicio,coment.id_usuario,coment.id_historial],(err,resp)=>{
  if(err){throw err}
  else
  {
    connection.query(prom,[coment.id_servicio],(err,proms)=>{
      console.log(proms);
      proms = proms[0];
      connection.query(upd1,[proms.prom,coment.id_servicio],(err,res)=>{
        connection.query(upd2,[coment.id_historial],(err,rowss)=>{
          callback(null,true)
        });

      });

    });
  }
});
}
};


comentmodule.agregarComentarioM = (coment,callback) =>
{
if(connection)
{
var ins = 'INSERT INTO comentarios_masc (comentario, calificacion, id_servicios, id_mascotas, id_historial) VALUES (?, ?, ?, ?,?);';
var prom = 'SELECT COUNT(calificacion) as cant,SUM(calificacion) as sum, ROUND(SUM(calificacion)/COUNT(calificacion)) as prom FROM comentarios_masc WHERE id_servicios=?;';
var upd1 = 'UPDATE servicios SET promedio=? WHERE id_servicios=?;';
var upd2 = 'UPDATE historial_masc SET calificada=1 WHERE id_historial=?;';
connection.query(ins,[coment.comentario,coment.califica,coment.id_servicio,coment.id_usuario,coment.id_historial],(err,resp)=>{
  if(err){throw err}
  else
  {
    connection.query(prom,[coment.id_servicio],(err,proms)=>{
      console.log(proms);
      proms = proms[0];
      connection.query(upd1,[proms.prom,coment.id_servicio],(err,res)=>{
        connection.query(upd2,[coment.id_historial],(err,rowss)=>{
          callback(null,true)
        });

      });

    });
  }
});
}
};




module.exports = comentmodule;
