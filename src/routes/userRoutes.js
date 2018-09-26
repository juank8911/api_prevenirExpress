const User = require('../models/user');
const jwts = require('../models/jwt');
const citas = require('../models/citas');


module.exports = function (app) {

// retorna los usuarion sin necesidad de ser admin 
	app.get('/',(req, res) => {User.getUsers((err, data) => {res.json(data);});});

//retorna el usuario usando jwts para la autentificacion del admin
	app.get('/user',jwts.validaAdmin,(req, res)=>{User.getUsers((err, data) => {res.json(data);});});

//retorna la informacion del usuario segun su id
	app.get('/user/:id',(req,res)=>{
		var id=req.params.id;
		User.darUserId(id,(err,res)=>{
			res.json(res);
		});
	});

	//retorna citas por el id del usuario

	app.get('/citas/:id',(req,res)=>{
		var id = req.params.id;
		citas.darCitasUsu(id,(err,resp)=>{
			res.json(resp);
		})
	});

}
