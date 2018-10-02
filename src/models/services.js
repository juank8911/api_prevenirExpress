let mysql = require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');
let fs = require('fs');
let imgmodule = require('./imagenes')
var rn = require('random-number');
var ba64 = require("ba64");
var regH = require("./horario");
var diasH = require("./dias");
var hora = require('./horario');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let servmodule = {};

// guarda los servicios con las fotos y todos sus datos
servmodule.save64 = (data, callback)=>
{
img = data.foto64;
nombre = data.nombre;
horario = data.horario;
var respuesta =[];
var horarios;
var p=0;
//console.log(img);
var cliente = data.precio*((100-data.descuento)/100);
var sql = 'INSERT INTO servicios(nombre,descripcion,duracion,max_citas_ves,video,precio,descuento,precio_cliente_prevenir,id_provedores,municipio_id_municipio) values (?,?,?,?,?,?,?,?,?,?);';
connection.query(sql,[data.nombre,data.descripcion,data.duracion,data.max_citas,data.video,data.precio,data.descuento,cliente,data.id_prov,data.muni],(err,res)=>{
if(err)
{
throw err
}
else
{

//console.log(res.insertId);
var idinsert = res.insertId;
//console.log(horario)
//horario.id=idinsert;
//console.log(horario);
horarios = horario[0];
horarios = horarios.horario;
//console.log(horarios);
for (var i = 0; i < horarios.length; i++)
{
var horas = horarios[i];
//console.log(horas.length);
if(horas.m_de!=null || horas.t_de!=null )
{
horas.id=idinsert;
//console.log(horas);
regH.agregarHorario(horas,(err,resp)=>{
respuesta.push(resp);
});
}
}

sqlss = 'INSERT INTO servicios_categoria (servicios_idservicios, categoria_idcategoria) VALUES (?, ?)';
connection.query(sqlss,[idinsert,data.categoria],(err,row)=>{
if(err)
{
throw err;
}
else
{
if(img.length>=1 )
{
var p = 1;
var respons = [];
for (var i = 0; i < img.length; i++)
{
var foto = img[i];
var options = {
min:  00001
, max:  999999
, integer: true
}
var rand = rn(options);
var name = data.nombre +'_'+rand+data.duracion+'_'+idinsert+rand
var fotos = foto.base64Image;
//console.log(fotos);
//var foto1 = fotos.base64Image;
var newPath = "src/public/servicios/"+name;
var pathView = "/servicios/"+name;
ba64.writeImageSync(newPath, fotos);
console.log(newPath);
if(fs.existsSync(newPath+'.jpeg'))
{ // inicio if
var sql = 'INSERT INTO fotos (nombre,ruta,servicios_idservicios) VALUES (?,?,?)';
connection.query(sql,[name,pathView+".jpeg",idinsert],(err,res)=>{
if(err)
{
//throw err
throw err;
respons[p-1]=({"name": name, "carga": true});
}
else
{
respons[p-1]=({"name": name, "carga": true});

if(p==img.length)
{
console.log(respons[1]);
var mensaje = [{'agregado':true}];
mensaje.fotos = respons;

callback(null,mensaje);
}
console.log(p+'=='+img.length);
p++;
console.log(newPath);
}

});

} // fin if
else
{
respons[p-1]=({"name": name, "carga": true});
console.log('error en la carga= '+newPath);
}

}


}
else
{
var options = {
min:  00001
, max:  999999
, integer: true
}
var rand = rn(options);
var name = data.nombre +'_'+rand+data.duracion+'_'+idinsert
var foto = img[0];
var foto1 = foto.base64Image;
var newPath = "src/public/servicios/"+name;
var pathView = "/servicios/"+name;
ba64.writeImageSync(newPath, foto1);
if(!fs.existsSync(newPath))
{
var sql = 'INSERT INTO fotos (nombre,ruta,servicios_idservicios) VALUES (?,?,?)';
connection.query(sql,[name,pathView,idinsert],(err,res)=>{
if(err)
{
throw err
}
else
{
respons.push({"name": name, "carga": "true"});
callback(null,respons);
}
});

}

}
}
});
// fin de else
}
});
};

//da servicios por provedor para el listado de el provedor al agregar un servicio o listarlos
servmodule.DarServiceUsu = (ids,callback) => {
console.log('prueba de servicios')
if(connection)
{
var sql = 'SELECT servicios.* FROM servicios WHERE id_provedores = ? ORDER BY createdupdate';
connection.query(sql,[ids],(err,row)=>{
if(err)
{

}
else
{
if (JSON.stringify(row)=='[]') {
//execute
//  console.log('vacio');
callback(null,[{'servicios':false}]);
}
else
{
var p =1;
var sql = 'SELECT * FROM fotos where servicios_idservicios = ? LIMIT 1';
var jsonServ = [];
//  console.log('fuera de la consulta')
var jsonServ = [];
row.forEach((serv)=>{
// console.log(serv.idservicios)
var id = serv.id_servicios;
connection.query(sql,[id],(err,resp)=>{
// console.log('dentro de la consulta '+id)
if(err)
{

}
else
{
serv.foto = resp;
serv.servicios = true;
//console.log(resp);
jsonServ.push(serv);
// console.log('/////////******* valor p '+p)
// console.log('/////////******* valor row '+row.length);
if(p>=row.length)
{
callback(null,jsonServ);
console.log('find de la consulta');
}
p++
}
});
});
}
}
});

}
console.log('prueba');

};


// guardaba servicios pero no funciona
servmodule.save = (data , callback ) => {
img = data.files;
nombre = data.nombre;
var itor = 0;
console.log(data);
var porcentaje = data.descuento / 100;
var valor_ciente = data.precio * porcentaje;
var sql = 'INSERT INTO servicios(nombre,descripcion,duracion,max_citas_ves,video,precio,descuento,precio_cliente_prevenir,provedores_id,municipio_id_municipio) values (?,?,?,?,?,?,?);';
connection.query(sql,[data.nombre,data.descripcion,data.duracion,data.max_citas,data.video,data.precio,data.descuento,valor_ciente,data.id_prov,data.muni],(err,res)=>{
if(err)
{
throw err
}
else
{
console.log(res);
var idinsert = res.insertId;
sql = 'INSERT INTO servicios_categoria (servicios_idservicios, categoria_idcategoria) VALUES (?, ?)';
connection.query(sql,[idinsert,data.categoria],(err,row)=>{
if(err)
{
throw err;
}
else
{

if(img.length>=1)
{
imgmodule.subidas(img,idinsert,(err,res)=>
{
callback(null,res);
});
}
else
{
var respons = [];
var div = img.name.split(".");
var name1 = div[0];
var name2 = div[1];
var name = name1+name2+img.path.split("\\").pop();
//console.log(name)
var newPath = "src/public/servicios/"+name;
var pathView = "/servicios/"+name;
//console.log(newPath);

fs.copyFileSync(img.path,newPath)
if(!fs.existsSync(newPath+name))
{

respons.push({"name": name, "carga": "true"});
var sql = 'INSERT INTO fotos (nombre,ruta,servicios_idservicios) VALUES (?,?,?)';
connection.query(sql,[name,pathView,idinsert],(err,res)=>{
if(err)
{
throw err
}
});
}
else
{
respons.push({"name": name, "carga": "false"});
}
callback(null,respons);
}

}
});
}

});

};

// devuelve los servicios para el ususario
servmodule.pruebaServicio = (callback)=>{
//  console.log('prueba de servicios')
if(connection)
{
var sql = 'SELECT servicios.*, categoria.nombre as categoria FROM servicios, categoria, servicios_categoria WHERE servicios.id_servicios = servicios_categoria.servicios_idservicios and categoria.id_categoria = servicios_categoria.categoria_idcategoria';
connection.query(sql,(err,row)=>{
if(err)
{

}
else
{
var p =1;
var sql = 'SELECT * FROM fotos where servicios_idservicios = ?';
var jsonServ = [];
//  console.log('fuera de la consulta')
var jsonServ = [];
row.forEach((serv)=>{
// console.log(serv.idservicios)
var id = serv.id_servicios;
//console.log(id);
connection.query(sql,[id],(err,resp)=>{
// console.log('dentro de la consulta '+id)
if(err)
{

}
else
{
serv.foto = resp;
//console.log(resp);
jsonServ.push(serv);
// console.log('/////////******* valor p '+p)
//console.log('/////////******* valor row '+row.length);
if(p>=row.length)
{
callback(null,jsonServ);
//console.log('find de la consulta');
}
p++
}
});
});

}
});

}
//  console.log('prueba');
};


// da los servicios para el ususario
servmodule.darServicios = (callback)=>{
var jsonServicios=[];
if(connection)
{
console.log('servicios/2do rchivo');
var sql = 'SELECT servicios.* FROM servicios ';
connection.query('SELECT servicios.* FROM servicios',(err,row)=>{
if(err)
{
console.log('error');
var mensaje = {'mensaje':'error al cargar servicios','carga':'false'};
callback(null,mensaje);
}
else
{
//jsonServicios = row;
if(row.length>=1)
{
imgmodule.darImagenesServ(row,(err,resp)=>
{
//console.log(resp);
callback(null,resp);

});
}
}
});

}

};
// da servicios por el id de del servicio
servmodule.darServiciosIdS = (id,callback)=>{
console.log('prueba de servicios')
if(connection)
{
var sql = 'SELECT servicios.*, categoria.nombre as categoria FROM servicios, categoria, servicios_categoria WHERE servicios.id_servicios = servicios_categoria.servicios_idservicios and categoria.id_categoria = servicios_categoria.categoria_idcategoria and servicios.id_servicios = ?';
connection.query(sql,[id],(err,row)=>{
if(err)
{

}
else
{
console.log(row);
var p =1;
var sql = 'SELECT * FROM fotos where servicios_idservicios = ?';
var jsonServ = [];
//  console.log('fuera de la consulta')
var jsonServ = [];
row.forEach((serv)=>{
// console.log(serv.idservicios)
var id = serv.id_servicios;
//console.log(id);
connection.query(sql,[id],(err,resp)=>{
// console.log('dentro de la consulta '+id)
if(err)
{

}
else
{
serv.foto = resp;
//console.log(resp);
jsonServ.push(serv);
// console.log('/////////******* valor p '+p)
//console.log('/////////******* valor row '+row.length);
if(p>=row.length)
{
callback(null,jsonServ);
//console.log('find de la consulta');
}
p++
}
});
});

}
});

}
};


// da servicios por el id de del servicio
servmodule.darServiciosMunCat = (ids,callback)=>{
//console.log('////////////////Servicios ')
var idm = ids.idm;
var idc = ids.idc;

if(connection)
{
if(idc==0)
{
//console.log('////////////////Servicios por muunicipios/////////// ')
var sql = 'SELECT servicios.*, categoria.nombre as categoria FROM servicios, servicios_categoria, categoria, municipio WHERE municipio.id_municipio = servicios.municipio_id_municipio and servicios.id_servicios = servicios_categoria.servicios_idservicios AND categoria.id_categoria = servicios_categoria.categoria_idcategoria AND municipio.id_municipio= ?;';
connection.query(sql,[idm],(err,row)=>{
if(err)
{
throw err
}
else
{
console.log(row);
if (JSON.stringify(row)!='[]')
{
var p =1;
var sql = 'SELECT * FROM fotos where servicios_idservicios = ?';
var jsonServ = [];
//  console.log('fuera de la consulta')
var jsonServ = [];
row.forEach((serv)=>{
// console.log(serv.idservicios)
var id = serv.id_servicios;
//console.log(id);
connection.query(sql,[id],(err,resp)=>{
// console.log('dentro de la consulta '+id)
if(err)
{

}
else
{
serv.foto = resp;
//console.log(resp);
jsonServ.push(serv);
// console.log('/////////******* valor p '+p)
//console.log('/////////******* valor row '+row.length);
if(p>=row.length)
{
callback(null,jsonServ);
//console.log('find de la consulta');
}
p++
}
});
});
}
else
{
callback(null,[{'vacio':true}])
}
}
});
}
else
{
//console.log('////////////////Servicios por municipos y categorias ')
var sql = 'SELECT servicios.*, categoria.nombre as categoria FROM servicios, servicios_categoria, categoria, municipio WHERE municipio.id_municipio = servicios.municipio_id_municipio and servicios.id_servicios = servicios_categoria.servicios_idservicios AND categoria.id_categoria = servicios_categoria.categoria_idcategoria AND municipio.id_municipio= ? and  categoria.id_categoria = ?  ;';
connection.query(sql,[idm,idc],(err,row)=>{
if(err)
{
throw err
}
else
{
// console.log(row);
if (JSON.stringify(row)!='[]')
{  var p =1;
var sql = 'SELECT * FROM fotos where servicios_idservicios = ?';
var jsonServ = [];
//  console.log('fuera de la consulta')
var jsonServ = [];
row.forEach((serv)=>{
// console.log(serv.idservicios)
var id = serv.id_servicios;
//console.log(id);
connection.query(sql,[id],(err,resp)=>{
// console.log('dentro de la consulta '+id)
if(err)
{

}
else
{
serv.foto = resp;
//console.log(resp);
jsonServ.push(serv);
// console.log('/////////******* valor p '+p)
//console.log('/////////******* valor row '+row.length);
if(p>=row.length)
{
callback(null,jsonServ);
//console.log('find de la consulta');
}
p++
}
});
});
}
else
{
callback(null,[{'vacio':true}])
}

}
});






}
}
};




// elimina un servicio de la base de datos
servmodule.deleteServ = (id,callback)=>{
if(connection)
{
hora.eliminarHorario(id,(err,res)=>{
var sql1 = 'DELETE FROM fotos where servicios_idservicios = ?';
var sql2 = 'DELETE FROM servicios_categoria WHERE servicios_idservicios = ?';
var sql = 'DELETE FROM servicios WHERE id_servicios = ?';
var sql3 = 'DELETE FROM medicos WHERE servicios_idservicios = ?';

connection.query(sql1,[id],(err,res)=>{
if(err){throw err;}
else {
{
connection.query(sql2,[id],(err,res2)=>{
if(err){throw err;}
else
{    connection.query(sql3,[id],(err,res)=>{
if(err){throw err}
else
{
connection.query(sql,[id],(err,row)=>{
if(err)
{
throw err
}
else
{
callback(null,{'eliminado':true});
}
});
}
});
}
});
}
}
});
});
}
};

servmodule.updateServ = (serv,callback)=>{
if(connection)
{var sql = 'UPDATE provedores SET correo=?,nit=?,nombre=?,direccion =?,telefono=?,logo=?,whatsapp=?,descripcion=? WHERE id=?;'
connection.query(sql,[serv],(err,resp)=>{if(err){throw err}else{callback(null,resp);}
});
}
};


module.exports = servmodule;
