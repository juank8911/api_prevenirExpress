let mysql =require('mysql');
let config = require('../config');


connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let comentmodule = {};

// agrega un comentario por cita a la base de atos con la calificacion brindada por el ususario
comentmodule.agregarComentario(coment,callback)
{
if(connection)
{
// var sql = 'SELECT'
}
}





module.exports = comentmodule;
