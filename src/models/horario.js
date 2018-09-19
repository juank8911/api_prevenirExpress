const mysql = require('mysql');

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


module.exports = horarioModel;
