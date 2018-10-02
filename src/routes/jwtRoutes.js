const jwts = require('../models/jwt');
const users = require('../models/user');
const provers = require('../models/provedores');


module.exports = function (app) {

//ejecuta el login de los ususarios y provedores
app.post('/login',(req, res) => {
var login = {
email: req.body.email,
password: req.body.pssw,
avatar: req.body.avatar
};
console.log(req.body);
//console.log(login);
jwts.login(login,(err, data) => {
//res.json(data);
//console.log(data);
//
res.json(data);
});
});


// realiza el registro de los ususarios y provedores segun si son admins o usuarios y si es por facebook o manual
app.post('/register',(req, res)=>{
var regist = {
nombre: req.body.nombre,
apellido: req.body.apellido,
cedula: req.body.id,
email: req.body.email,
password: req.body.pssw,
direccion: req.body.direccion,
tel: req.body.tel,
admin: req.body.esAdmin,
face: req.body.face,
parent: 17,
avatar:req.body.avatar
};
console.log(regist);
//console.log('//*/*/*/*/*///');
//console.log(regist);
jwts.registroMember(regist, (err,data)=>{
var valida = data.existe;
var datos = data;
//valida si existe o no en la base de datos
console.log('////////*****//////');
console.log(datos);
if(valida=='false' || valida==false)
{
//console.log('valida');
//console.log(regist);
//valida si es o no administrador
//console.log(regist.admin);
console.log('dentro del if de valida');
if(regist.admin=='true'||regist.admin==true)
{
console.log('validacion de admin'+regist.admin);
//console.log('es admin');
//valida si el registro es echo por facebook
//console.log('/*/*/*/*/*/*/*/*/*/*/*');
//console.log(regist.face);
if(regist.face==='true'||regist.face==true)
{
provers.regProvedorFace(regist,(err,datapf)=>{
jwts.login(regist, (err,datas)=>{
//console.log('///////*****////***///*****')
//console.log([datapf,datas]);
var prueba = [datapf,datas];
res.json([datapf,datas]);
});
});
}
else
{
console.log('registrando usuario');
provers.regProv(regist,(err,datapn)=>{
jwts.login(regist, (err,datas)=>{
//console.log('///////*****////***///*****')
//console.log([datapn,datas]);
var prueba = [datapn,datas];
res.json([datapn,datas]);
});
});

}
}
else
{

//console.log('no es admin');
//console.log(regist.face);
if(regist.face==='true'||regist.face==true)
{
//console.log('envio a facebook')
users.registerFace(regist,(err,dataf)=>{
jwts.login(regist, (err,datas)=>{
//console.log('///////*****////***///*****')
//console.log([datapf,datas]);
var prueba = [dataf,datas];
res.json([dataf,datas]);
});
});
}
else
{
console.log('usuario registrado manualmnete');
users.registerUsu(regist,(err,dataU)=>{
jwts.login(regist, (err,datas)=>{
//console.log('///////*****////***///*****')
//console.log([datapf,datas]);
var prueba = [dataU,datas];
console.log([dataU,datas]);
res.json([dataU,datas]);
});
});
}
}

}
else
{
console.log([{'menaje':'no se pudo agregar el usuario ya existe','existe':true},datos]);
res.json([{'menaje':'no se pudo agregar el usuario ya existe','existe':true},datos]);
}
});

});



}
