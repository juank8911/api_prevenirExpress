let mysql =require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');
let vals = require('./valida');
let user = require('./user');
connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let jwtmodel = {};

//realiza el login de los ususarios retorna un token
jwtmodel.login = (logins,callback) =>{
//  console.log('****************************');
//  console.log(logins);
//res.send({'mensaje':'usuario enviado por post'});
if(connection)
{
var email = logins.email;
var password = logins.password;
var sql = 'SELECT id, email, password, admin FROM members WHERE email = ? AND password = ? ';
// console.log('****************************');
// console.log(logins);
connection.query(sql,[email , password ],(err,row)=>{
if(err)
{
throw err;
}
else
{
var login = row[0];
if(login!=null)
{
console.log('/////***//////');
console.log(login);
var av = {avatar:logins.avatar,id:login.id};
console.log(av);
var member = {email:login.email,password:login.password,admin:login.admin};
console.log(member);
var tokenres = jwts.sign(member,config.jwt_secreto);
var admins = login.admin;
if(admins=='true')
{
admins=true;
}
else
{
admins=false;
user.putAvatar(av,(err,res)=>{
console.log(res);
});
}
var idU = login.id;
let loges = {token:tokenres, login:true , esAdmin:admins, id_usuario:idU};
console.log(admins);
console.log(loges);
callback(null,loges);}
else {
let error = {menaje:'usuario o contraseña incorrecto', login:false};
callback(null,error);
}
}
});
}
else {
console.log('error en la conxion a la base de datos');
}
};


//regista la parte memebre a la base de datos para el login de los ususarios
jwtmodel.registroMember = (register, callback) =>{
//  console.log('recibido registro',register);
if(connection)
{
//var nombre = register.nombre;
//var apellidos = register.apellidos;
var memid = register.cedula;
var mememail = register.email;
var password = register.password;
var admin = register.admin;
//  console.log('////////////////////////////');
//  console.log(admin);
var isadmin;
if(admin===true){isadmin = 'true';}
else{isadmin='false';}
//console.log(isadmin);
var val = {email:mememail,id:memid};
vals.vRegistro(val,(err,res)=>{
console.log('/////////////////*************///////');
console.log(res);

if(res.existe==='false')
{
console.log('dentro el if'+res);
//confirma que el member no exista en la base de datos
var sql = 'INSERT INTO members (id, email, admin, password) VALUES (?, ?, ?, ?)';
//console.log('prueba envio email', mememail);
connection.query(sql,[memid,mememail,isadmin,password],(err,row)=>{
if(err)
{
throw err;
}
else
{
//console.log("1 record inserted, ID: ", row);
let valido = {mensaje:'Usuario registrado con exito',existe:'false'};
console.log('agregado');
callback(null,valido);

}
});
}
else{
let valido = {mensaje:'usuario ya exist',existe:'true'};
callback(null,res);

}
});
}
};

//valida si el usuario esta logeado o no
jwtmodel.valida = (req, res,next) =>
{
var token = req.body.token || req.query.token || req.headers['x-access-token'];
console.log(token);
if(token)
{
jwts.verify(token,config.jwt_secreto,(err, decoded)=>{
if(err)
{
console.log(err);
return res.status(403).send({'mensaje':'error al validar usuario, inicie sesion de nuevo'});
}
else
{
req.decoded = decoded;
//console.log(decoded);
next();
}
});
}
else
{
return res.status(403).send({'mensaje':'error al validar ususario'});
}

};

//valida si el ususario esta logeado y si es admin o no
jwtmodel.validaAdmin = (req,res,next) =>
{
var token = req.body.token || req.query.token || req.headers['x-access-token'];

if(token)
{
jwts.verify(token,config.jwt_secreto,(err, decoded)=>{
if(err)
{
console.log(err);
return res.status(403).send({'mensaje':'error al validar usuario, inicie sesion de nuevo'});
}
req.decoded = decoded;
console.log(decoded);
if(decoded.admin==true || decoded.admin=='true' )
{
next();
}
else
{
return res.status(403).send({'mensaje':'error al validar usuario, no es admin'});
}


});
}
else
{
console.log('no ahy token');
return res.status(305).send({'mensaje':'error al validar ususario'});
}
};

module.exports = jwtmodel;
