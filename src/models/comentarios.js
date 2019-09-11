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
  // console.log(coment);
if(connection)
{
var ins = 'INSERT INTO comentarios (comentario, calificacion, usuarios_id, historial_id, id_consultorio) VALUES (?, ?, ?, ?, ?);'
var prom = 'SELECT COUNT(calificacion) as cant,SUM(calificacion) as sum, ROUND(SUM(calificacion)/COUNT(calificacion)) as prom FROM comentarios,consultorio,servicios WHERE comentarios.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = ?;';
var upd1 = 'UPDATE servicios SET promedio=? WHERE id_servicios=?;';
var upd2 = 'UPDATE historial SET calificada=1 WHERE id_historial=?;';
connection.query(ins,[coment.comentario,coment.califica,coment.id_usuario,coment.id_historial,coment.id_consultorio],(err,resp)=>{
  if(err){throw err}
  else
  {
    connection.query(prom,[coment.id_servicio],(err,proms)=>{
      // console.log(proms);
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

//agrega los comentaroios de la cita de una mascota
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
      // console.log(proms);
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

//guarda la respuesta del medico al comentario de el paciente
comentmodule.respuestasFaltaMed = (ids,callback) =>{
  if(connection)
  {
    // console.log('pase 1');
    if(ids.cate != 20)
    {
      console.log('pase 2');
      var sel = 'SELECT comentarios.*, CONCAT(usuarios.nombre," ",usuarios.apellidos) as usu, usuarios.avatar FROM comentarios,consultorio, usuarios WHERE usuarios.id = comentarios.usuarios_id AND comentarios.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = ? AND consultorio.medico_id = ? AND comentarios.coment_m = 0;';
      connection.query(sel,[ids.id, ids.idm],(err,resp)=>{
        if(err){throw err}
        else
        {
          callback(null,resp);
        }
      });
    }
    else
    {
      var sel = 'SELECT comentarios_masc.*, mascotas.nombre as usu, mascotas.avatar FROM comentarios_masc,consultorio, mascotas WHERE mascotas.id_mascotas = comentarios_masc.id_mascotas AND comentarios_masc.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = ? AND consultorio.medico_id = ? AND comentarios_masc.coment_m = 0;';
      connection.query(sel,[ids.id, ids.idm],(err,resp)=>{
        if(err){throw err}
        else
        {
          callback(null,resp);
        }
      });
    }
  }
};

//cambia el comentario del medico
comentmodule.UpdateComentMed = (coment,callback)=>{
  if(connection)
  {
    // console.log(coment);
      if(coment.cate != 20)
      {
        // console.log('dentro');
        var upd = 'UPDATE comentarios SET comentario_med = ?, coment_m = 1 WHERE (id_comentarios = ?)';
        connection.query(upd,[coment.coment,coment.id],(err,row)=>{
          if(err){throw err}
          else
          {
            // console.log(row);
            callback(null,true)
          }
        });
      }
      else
      {
        var upd = 'UPDATE comentarios_masc SET comentarios_masc.cometario_med = ?, comentarios_masc.coment_m = 1 WHERE (comentarios_masc.id_comentarios = ?);';
        connection.query(upd,[coment.coment,coment.id],(err,row)=>{
          if(err){throw err}
          else
          {
            // console.log(row);
            callback(null,true)
          }
        });

      }
  }
};




module.exports = comentmodule;
