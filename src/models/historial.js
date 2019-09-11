let mysql = require('mysql');
let config = require('../config');
let eject = require('./ejecucion');
var moment = require('moment');

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
    let sel = 'SELECT historial.*, CONCAT(usuarios.nombre," ",usuarios.apellidos) as nombres, servicios.nombre as servicio, servicios.id_servicios, consultorio.id_consultorio, sucursales.nombre as sucursal, sucursales.direccion, sucursales.telefono, sucursales.id_sucursales, sucursales.id_municipio FROM historial, usuarios, consultorio, servicios, sucursales WHERE consultorio.id_sucursales = sucursales.id_sucursales AND historial.usuarios_id = usuarios.id AND historial.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = servicios.id_servicios AND historial.usuarios_id = ? ORDER BY historial.calificada asc, historial.start asc';

          connection.query(sel,[id],(err,resp)=>{
            // console.log('en historial ejecutando');
            // console.log(resp);
              callback(null,resp);
          });


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
        // console.log(benf.length);
        if(benf.length==0)
        {
          // console.log(benf);
            callback(null,benf);
        }
        else
        {
          for (var i = 0; i < benf.length; i++) {
          benefs.push(benf[i].id);
          // console.log(i +' / '+ benf.length);
          if(p==benf.length)
          {
              // console.log(benefs);
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
  let mas = 'SELECT historial_masc.*, mascotas.nombre, consultorio.id_consultorio, servicios.nombre as servicio, servicios.id_servicios, sucursales.nombre as sucursal, sucursales.direccion, sucursales.telefono, sucursales.id_sucursales, sucursales.id_municipio FROM historial_masc, mascotas, consultorio, servicios, sucursales WHERE historial_masc.id_mascotas = mascotas.id_mascotas AND historial_masc.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = servicios.id_servicios AND consultorio.id_sucursales = sucursales.id_sucursales AND mascotas.id_usuarios = ? ORDER BY historial_masc.calificada asc, historial_masc.start asc;';
  connection.query(mas,[id],(err,row)=>{
    if(err){throw err}
    else
    {
      // console.log(row);
      callback(null,row);
    }
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
  // console.log(ids);
  let sql = 'SELECT historia_opt.* FROM historia_opt, usuarios, servicios, medicos, consultorio WHERE historia_opt.id_usuario = usuarios.id AND historia_opt.id_servicios = servicios.id_servicios AND consultorio.id_servicios = servicios.id_servicios AND consultorio.medico_id = medicos.medico_id AND medicos.medico_id = ? AND usuarios.cedula = ?;';
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
      var sql = 'SELECT historial_masc.id_historial, mascotas.nombre as title, start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM historial_masc, servicios, mascotas, consultorio WHERE historial_masc.id_mascotas = mascotas.id_mascotas AND historial_masc.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = servicios.id_servicios AND consultorio.id_consultorio = ? AND consultorio.medico_id = ? AND MONTH(start) = ?  AND YEAR(start) = ?;';
    }
    else
    {
      //console.log('no entro al if');
      var sql = 'SELECT historial.id_historial, usuarios.*, CONCAT(usuarios.nombre," ",usuarios.apellidos) as title, start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM historial, servicios, medicos,usuarios, consultorio WHERE historial.usuarios_id = usuarios.id AND historial.id_consultorio = consultorio.id_consultorio AND consultorio.id_servicios = servicios.id_servicios AND consultorio.id_consultorio = ? AND consultorio.medico_id = medicos.medico_id and medicos.medico_id = ? AND MONTH(start) = ?  AND YEAR(start) = ?;'
    }


  connection.query(sql,[ser.con,ser.med,ser.mes,ser.anio],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      if(JSON.stringify(row)=='[]')
      {
            callback(null,{citas:false})
      }
      else
      {
        for (var i = 0; i < row.length; i++) {
          // console.log(row[i]);
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


histModule.histoServicio = (ser,callback) => {

  let res =[];
  // console.log(ser);
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
      var sql = 'SELECT historial.id_historial, usuarios.*, CONCAT(usuarios.nombre," ",usuarios.apellidos) as title, start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM historial, servicios, usuarios WHERE historial.usuarios_id = usuarios.id AND historial.servicios_idservicios = servicios.id_servicios AND historial.servicios_idservicios = ? AND MONTH(start) = ?  AND YEAR(start) = ?;'



  connection.query(sql,[ser.ser,ser.mes,ser.anio],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      // console.log(row);
      if(JSON.stringify(row)=='[]')
      {
          callback(null,{citas:false})
      }
      else
      {
        for (var i = 0; i < row.length; i++) {
          // console.log(row[i]);
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

}
};


histModule.histoSucursal = (ser,callback) => {

  let res =[];
  // console.log(ser);
  if(connection)
  {
    //console.lo.log(ev.id_mascotas);
    if(ev.id_mascotas==20 || ev.id_mascotas=='20')
    {
      //console.log('dentro del if');
      // console.log('mascota');
      var sql = 'SELECT historial_masc.id_historial, mascotas.nombre as title, start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM historial_masc, mascotas, consultorio WHERE historial_masc.id_consultorio = consultorio.id_consultorio AND historial_masc.id_mascotas = mascotas.id_mascotas AND consultorio.id_sucursales = ? AND MONTH(start) = ? AND YEAR(start) = ? AND consultorio.id_servicios = ?;'
    }
    else
    {
      //console.log('no entro al if');
      // console.log('humano');
      var sql = 'SELECT historial.id_historial, usuarios.*, CONCAT(usuarios.nombre," ",usuarios.apellidos) as title, start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM historial, consultorio,sucursales, usuarios WHERE historial.usuarios_id = usuarios.id AND historial.id_consultorio = consultorio.id_consultorio AND consultorio.id_sucursales = sucursales.id_sucursales AND sucursales.id_sucursales = ? AND MONTH(start) = ?  AND YEAR(start) = ? AND consultorio.id_servicios = ?;'
    }


  connection.query(sql,[ser.suc,ser.mes,ser.anio,ser.ser],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      // console.log('dentro del else');
      // console.log(row);
      if(JSON.stringify(row)=='[]')
      {
          callback(null,{citas:false})
      }
      else
      {
        for (var i = 0; i < row.length; i++) {
          // console.log(row[i]);
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


histModule.histoSucCon = (ser,callback) => {

  let res =[];
  // console.log('LOGIN DE SERVICIO PRUEBA');
  // console.log(ser);
  if(connection)
  {
    //console.lo.log(ev.id_mascotas);
    if(ev.id_mascotas==20 || ev.id_mascotas=='20')
    {
      //console.log('dentro del if');
      // console.log('MASCOTA');
      var sql = 'SELECT historial_masc.id_historial, mascotas.nombre as title, start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM historial_masc, mascotas, consultorio WHERE historial_masc.id_consultorio = consultorio.id_consultorio AND historial_masc.id_mascotas = mascotas.id_mascotas AND consultorio.id_sucursales = ? AND MONTH(start) = ? AND YEAR(start) = ? AND consultorio.id_consultorio = ?;'
    }
    else
    {
      //console.log('no entro al if');
      var sql = 'SELECT historial.id_historial, usuarios.*, CONCAT(usuarios.nombre," ",usuarios.apellidos) as title, start, end,YEAR(start) as year, MONTH(start)-1 as month, DAY(start) as date FROM historial, consultorio,sucursales, usuarios WHERE historial.usuarios_id = usuarios.id AND historial.id_consultorio = consultorio.id_consultorio AND consultorio.id_sucursales = sucursales.id_sucursales AND sucursales.id_sucursales = ? AND MONTH(start) = ?  AND YEAR(start) = ? AND consultorio.id_consultorio = ?;'
    }

  connection.query(sql,[ser.suc,ser.mes,ser.anio,ser.con],(err,row)=>{
    if(err)
    {
      throw err;
    }
    else
    {
      // console.log(row);
      if(JSON.stringify(row)=='[]')
      {
          callback(null,{citas:false})
      }
      else
      {
        for (var i = 0; i < row.length; i++) {
          // console.log(row[i]);
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
