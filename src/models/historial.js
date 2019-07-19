let mysql = require('mysql');
let config = require('../config');
let eject = require('./ejecucion');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let histModule = {};

histModule.darHistorialU = (id,callback)=>{
  let hist = [];
  let p = 1;
  let q = 1;
  let benefs = [parseInt(id)];
    if(connection)
  {
    // let benf = 'SELECT usuarios.id FROM usuarios WHERE usuariosBf_id = ? ;';
    let sel = 'SELECT historial.*,servicios.direccion, CONCAT(usuarios.nombre," ",usuarios.apellidos) as nombres, servicios.nombre as servicio FROM historial, usuarios, servicios WHERE usuarios.id = historial.usuarios_id AND servicios.id_servicios = historial.servicios_idservicios AND usuarios_id = ? ORDER BY historial.calificada asc, historial.start asc;';
    // connection.query(benf,[id],(err,benf)=>{
    //   if(err){throw err}
    //   else
    //   {
    //     console.log(benf.length);
    //     if(benf.length==0)
    //     {
          connection.query(sel,[id],(err,resp)=>{
            console.log('en historial ejecutando');
            // console.log(resp);
              callback(null,resp);
          });
    //     }
    //     else
    //     {
    //       for (var i = 0; i < benf.length; i++) {
    //       benefs.push(benf[i].id);
    //       console.log(i +' / '+ benf.length);
    //       if(p==benf.length)
    //       {
    //           console.log(benefs);
    //           eject.histrialBenf(benefs,(err,res)=>{
    //             callback(null,res);
    //           });
    //       }
    //       p++;
    //     }
    //   }
    //
    //   }
    // });

  }
};

histModule.darHistorialB = (id,callback)=>{
  let hist = [];
  let p = 1;
  let q = 1;
  let benefs = [];
    if(connection)
  {
    let benf = 'SELECT usuarios.id FROM usuarios WHERE usuariosBf_id = ? ;';
    let sel = 'SELECT historial.*,servicios.direccion, CONCAT(usuarios.nombre," ",usuarios.apellidos) as nombres, servicios.nombre as servicio FROM historial, usuarios, servicios WHERE usuarios.id = historial.usuarios_id AND servicios.id_servicios = historial.servicios_idservicios AND usuarios_id = ? ORDER BY historial.calificada asc, historial.start asc;;';
    connection.query(benf,[id],(err,benf)=>{
      if(err){throw err}
      else
      {
        console.log(benf.length);
        if(benf.length==0)
        {
          connection.query(sel,[id],(err,resp)=>{
            console.log('en historial ejecutando');
            // console.log(resp);
              callback(null,resp);
          });
        }
        else
        {
          for (var i = 0; i < benf.length; i++) {
          benefs.push(benf[i].id);
          console.log(i +' / '+ benf.length);
          if(p==benf.length)
          {
              console.log(benefs);
              eject.histrialBenf(benefs,(err,res)=>{
                callback(null,res);
              });
          }
          p++;
        }
      }

      }
    });

  }
};


histModule.historialPel = (id,callback)=>{
if(connection)
{
  let mas = 'SELECT historial_masc.*,historial_masc.id_servicios as servicios_idservicios, servicios.nombre as servicio, mascotas.nombre as nombres, servicios.direccion FROM mascotas, usuarios, historial_masc, servicios WHERE mascotas.id_usuarios = usuarios.id AND mascotas.id_mascotas = historial_masc.id_mascotas AND servicios.id_servicios = historial_masc.id_servicios AND usuarios.id = ? ORDER BY historial_masc.calificada asc, historial_masc.start asc;';
  connection.query(mas,[id],(err,row)=>{
    callback(null,row);
  });
}

};

histModule.historiaUsuSer = (ids,callback)=>{
  let sql = 'SELECT historia_opt.* FROM historia_opt, usuarios WHERE usuarios.id = historia_opt.id_usuario AND historia_opt.id_servicios = ? and usuarios.id = ?;';
  connection.query(sql,[ids.ser,ids.usu],(err,row)=>{
    if(err){throw err}
    else {
      callback(null,row);
    }
  });
};

histModule.historiaUsuCed = (ids,callback)=>
{
  let sql = 'SELECT historia_opt.* FROM historia_opt, usuarios, servicios, medicos WHERE historia_opt.id_usuario = usuarios.id AND historia_opt.id_servicios = servicios.id_servicios AND servicios.medico_id = medicos.medico_id AND medicos.medico_id = ? AND usuarios.cedula = ?;'
  connection.query(sql,[ids.ser,ids.ced],(err,row)=>{
    if(err){throw err}
    else
    {
      callback(null,row);
    }
  });
}


histModule.historialMedico = (ser,callback) => {

  let res =[];
  if(connection)
  {
    //console.lo.log(ev.id_mascotas);
    if(ev.id_mascotas==20 || ev.id_mascotas=='20')
    {
      //console.log('dentro del if');
      var sql = 'SELECT  events_masc.id_eventos, mascotas.*,events_masc.id_mascotas, mascotas.nombre as title ,start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM events_masc, mascotas WHERE events_masc.id_mascotas = mascotas.id_mascotas AND MONTH(start) = ? AND YEAR(start) = ? and id_servicios = ?'
    }
    else
    {
      //console.log('no entro al if');
      var sql = 'usuarios.id AND historial.servicios_id_servicios = servicios.id_servicios AND servicios.id_servicios = ? AND servicios.medico_id = ?, medicos.medico_id AND medicos.medico_id = ? AND MONTH(start) = ?  AND YEAR(start) = ?;'
    }


  connection.query(sql,[ser.ser,ser.med,ser.mes,ser.anio],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      if(JSON.stringify(row)=='[]')
      {

      }
      else
      {
        for (var i = 0; i < row.length; i++) {
          console.log(row[i]);
          let vari = row[i];
          vari.start = moment(vari.start).utc(-5).format();
          vari.end =  moment(vari.end).utc(-5).format();
          res.push(vari);
        }
        callback(null,res);
      }

    }
  });
  }
};







module.exports = histModule;
