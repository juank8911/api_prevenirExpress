const User = require('../models/user');
const jwts = require('../models/jwt');


module.exports = function (app) {

	app.get('/',(req, res) => {User.getUsers((err, data) => {res.json(data);});});

	app.get('/prueba',jwts.validaAdmin,(req, res)=>{User.getUsers((err, data) => {res.json(data);});});

	app.get('/user/:id',(req,res)=>{
		var id=req.params.id;
		User.darUserId(id,(err,res)=>{
			res.json(res);
		});
	});

}
