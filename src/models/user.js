const mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
    host: config.host,
    user: config.userbd,
    password: config.passwordbd,
    database: config.nombredb
});

let userModel={};
//devuelve los usuarios en un listado
userModel.getUsers = (callback) => {
	if(connection)
  {
    console.log('conexion a la base de datos');
		connection.query(
			'SELECT * FROM usuarios limit 1;',(err, row)=>
      {if(err){
					     throw err;
				      }else{
                row.avatar = 'http://192.168.1.43:3300/servicios/KLogopnguWIynnN2AfJ58ou8iUpTysZH.png';
				             callback(null,row);
				            }
			}
		)
	}
  else
  {
    console.log('error en la conxion a la base de datos');
  }
};


//registro de usuarios por facebook
userModel.registerFace = (usu, callback)=> {
if(connection)
{
  var id = usu.cedula;
  var correo = usu.email;
  var nombre = usu.nombre;
  var apellido = usu.apellido;

  var sql = 'INSERT INTO usuarios(id,correo,nombre,apellidos,members_id,parentescos_id_parentescos) VALUES (?,?,?,?,?);';
  console.log('Agregando ususario');
  connection.query(sql,[id,correo,nombre,apellido,id,usu.parent],(err, row)=>{
    if(err)
    {
      console.log('no agregado ususario');
      connection.query('DELETE FROM members WHERE id = ?',[id],(err,res)=>{
      throw err
      });
      throw err
    }
    else
    {
      console.log('Agregado el ususario');
      var mensaje = {'mensaje':'usuario agregado con exito','existe':false,'id_usuario':id};
      callback(null,mensaje);
    }
  });
}
else
{
callback(null,{'error':'error al comunicarse con la base de datos'});
}
};
// registra a los ususarios manualmmente
userModel.registerUsu = (usu, callback) =>{
    if(connection)
    {
      var id = usu.cedula;
      var cedula = usu.cedula;
      var correo = usu.email;
      var nombre = usu.nombre;
      var apellido = usu.apellido;
    }

    var sql = 'INSERT INTO usuarios(id,cedula,correo,nombre,apellidos,members_id,parentescos_id_parentescos) VALUES (?,?,?,?,?,?)';
    connection.query(sql,[id,cedula,correo,nombre,apellido,id,usu.parent],(err, row)=>{
      if(err)
      {
        connection.query('DELETE FROM members WHERE id = ?',[id],(err,res)=>{
        callback(null,{'mensaje':'error al agregar el usuario'});
        });
        throw err
      }
      else
      {
        console.log('Agregado el ususario');
        var mensaje = {'mensaje':'usuario agregado con exito','existe':false,'id_usuario':id};
        callback(null,mensaje);
      }
    });
};
// retorna los usuarios por su id
userModel.darUserId=(id,callback)=>{
  if(connection)
  {
    var sql = 'SELECT * FROM usuarios where id = ? ';
    connection.query(sql,id,(err,row)=>{if(err){throw err}else{
        callback(null,row);
    }
  });
  }
};
module.exports = userModel;
