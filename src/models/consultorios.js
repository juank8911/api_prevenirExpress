let mysql = require('mysql');
let config = require('../config');
var forEach = require('async-foreach').forEach;
let hors = require('./horario');
let csh = require('./con_ser_hor');
let med = require('./medicos')

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let consulModule = {};



//INSERTA CONSULTORIOS A LA SUCURSAL CON SU RESPECTIVO MEDICO
consulModule.insertConsul = (consuls,callback)=>{
if(connection)
{
  console.log('CONSULS DENTRO DE AGREGAR CONSULTORIOS');
  console.log(consuls);
  let id_sucu = consuls.id_sucursal;
  var sql = 'INSERT INTO consultorio (nombre, extencion, medico_id, id_sucursales) VALUES (?, ?, ?, ?);';
  var p = 0;
  var ids=[];
  for (var i = 0; i < consuls.length; i++) {
    var consul = consuls[i];
    console.log(consuls.length);
    console.log(consul);
    connection.query(sql,[consul.nombre, consul.extencion, consul.medico_id, id_sucu],(err,res)=>{
      if(err){throw err}
      else
      {
        console.log('HORARIOS');
          console.log(consul.horarios);
      }
    });
  }

}

};

consulModule.insertConsul1 = (consuls, callback) =>
{

if(connection)
{
  var p = 0;
  var sch=[]
  // console.log('CONSULS DENTRO DE AGREGAR CONSULTORIOS');
  let id_sucu = consuls.id_sucursal;
  let id_prov = consuls.id_provedor;
  let medicos = [];
  var sql = 'INSERT INTO consultorio (nombre, extencion, medico_id, id_sucursales, id_servicios) VALUES (?, ?, ?, ?, ?);';
  var horarios = [];
  forEach(consuls, function(consul, index, arr)
{
      return new Promise((res,rej)=>{
        connection.query(sql,[consul.nombre, consul.extencion, consul.medico_id, id_sucu, consul.id_servicio],(err,data) => {
          return (err) ? rej(err) :  res(data)
        })
        })
        .then((res,rej)=>{
              consul.horarios.id_consul = res.insertId;
              medicos.push({id_sucursal:id_sucu,id_provedor:id_prov,id_consultorio:res.insertId,id_medico:consul.medico_id});
              // console.log('MEDICO');
              // console.log(medicos);
                // console.log('dentro del if de consultorios');
                console.log('HORARIOS');
                console.log(consul.horarios);
                console.log('--------------------------------');
                hors.agregarHorario1(consul.horarios,(err,data1)=> {
                  // console.log('////////////////////////////////////////');
                  // console.log(data1);
                  // console.log('////////////////////////////////////////');
                    // console.log(index, '/ ', consuls.length-1);
                    if(index>=consuls.length-1)
                    {
                      // console.log('FIN CONSULTORIOS');
                      // console.log(data1);
                        csh.agregaids(data1,(err,res)=>{
                          med.activaMedico(medicos,(err,resp)=>{
                            callback(null,true)
                            return data1
                          });

                          })
                      }
                });
              })
              // console.log('FUERA DE PROMESA');
})


}


};

consulModule.deleteConsultorio = (idc,callback)=>
{
  if(connection)
  {
    var selho = 'SELECT id_horario FROM con_ser_hor WHERE id_consultorio = ?'
    connection.query(selhor,[idc],(rer,idshor)=>{
          if(err){throw err}
          else
          {
            console.log(idshor);
          }
    });
  }
}


//------------------------------------------------------------------------------------
//                   METODOS DE BUSQUEDA DE CONSULTORIOS
//  - por SUCURSAl,
//  -
//____________________________________________________________________________________

consulModule.buscarConsulSuc = (ids, callback) =>
{
if(connection)
{
  var sql = "SELECT consultorio.*, CONCAT(medicos.nombres ,' ', medicos.apellidos) as medico, servicios.nombre as servicio FROM consultorio, medicos, servicios WHERE consultorio.medico_id = medicos.medico_id AND consultorio.id_servicios = servicios.id_servicios AND  id_sucursales = ?;"
  var suc = 'SELECT sucursales.*, municipio.nombre as municipio FROM sucursales, municipio WHERE sucursales.id_municipio = municipio.id_municipio AND id_sucursales = ?;'
  connection.query(suc,[ids],(err,res)=>{
    if(err){throw err}
    else
  {

    connection.query(sql,[ids],(err,consuls)=>{
      if(err){throw err}
      else
      {
        // console.log(consuls);
        res = res[0];
        // console.log(res);
        // res.consultorio = consuls
        // callbak(null,res);
        forEach(consuls, function(consul, index, arr)
      {
          // console.log(consul);
          hors.darHorarioCon(consul.id_consultorio,(err,hora)=>{
              consul.horario = hora;
              // console.log(consul);
              if(index>=consuls.length-1)
              {
                res.consultorio = consuls;
                callback(null,res);
              }
          })
      })


      }
    });
  }
  })
}
}


module.exports = consulModule;
