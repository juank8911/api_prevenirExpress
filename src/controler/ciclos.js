let mysql =require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');
let fs = require('fs');
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'prevenirexpres'
});

let cicloModule = {};

cicloModule.imges  = (id,callback)=>
{
  var ids = id;
  if(connection)
  {
    var sql = 'SELECT * FROM fotos where servicios_idservicios = ?';
    connection.query(sql,[id],(err,row)=>{
      if(err)
      {

      }
      else
      {
        console.log(row);
        callback(null,row);
      }
    });
  }

};

module.exports = cicloModule;
