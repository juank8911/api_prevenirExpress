const User = require('../models/user');
const jwts = require('../models/jwt');
const citas = require('../models/citas');


module.exports = function (app) {

	app.get('/',(req, res) => {User.getUsers((err, data) => {res.json(data);});});

	app.get('/user',jwts.validaAdmin,(req, res)=>{User.getUsers((err, data) => {res.json(data);});});

	app.get('/user/:id',(req,res)=>{
		var id=req.params.id;
		User.darUserId(id,(err,res)=>{
			res.json(res);
		});
	});

	app.get('/citas/:id',(req,res)=>{
		var id = req.params.id;
		citas.darCitasUsu(id,(err,resp)=>{
			res.json(resp);
		})
	});

}
