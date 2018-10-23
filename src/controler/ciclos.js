let mysql =require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');
let fs = require('fs');
let rl = require('random-letter');
var rn = require('random-number');
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



cicloModule.generaSalt = (callback) =>
{
  var randl1 = rl()+rl()+rl()+rl()+rl()+rl()+rl()+rl();
  var randl2 = rl()+rl()+rl()+rl()+rl()+rl()+rl();
  var randl3 = rl()+rl()+rl()+rl()+rl()+rl()+rl()+rl()+rl()+rl()+rl();
  var randl4 = rl()+rl()+rl()+rl()+rl()+rl();

  console.log(randl1);
  var options = {
  min:  000000001
  , max:  9999999999
  , integer: true
  }
  var rand0 = rn(options)+rl()+rl();
  var rand1 = rl()+rn(options)+rl();
  var rand2 = rn(options);
  var rand3 = rn(options);
  var name = rand1+randl1+rand2+randl2+rand3+rand0+randl3;
  console.log(name);
  callback(null,name)

};

module.exports = cicloModule;
