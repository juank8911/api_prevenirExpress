let mysql =require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let pushmodule = {};

pushmodule.addtoken = (token,callback)=>{
  if(connection)
  {
    if(admin=='true')
    {
      var sel = 'SELECT members_id FROM provedores WHERE id_provedor = ?;';
      connection.query(sql,[token.id],(err,res)=>{
        if(err){throw err}
        else
        {
          res = res[0]:
          var upd = 'UPDATE members SET tokenpsh = ? WHERE id = ?;';
          connection.query(upd,[token.token,res.members_id],(err,resp)=>{
            if(err){throw err}
            else
            {
              callback(null,true);
            }
          });
        }
      });

    }
    else if(admin=='false')
    {
      var sel = 'SELECT members_id FROM usuarios WHERE id = ?;';
      connection.query(sql,[token.id],(err,res)=>{
        if(err){throw err}
        else
        {
          res = res[0]:
          var upd = 'UPDATE members SET tokenpsh = ? WHERE id = ?;';
          connection.query(upd,[token.token,res.members_id],(err,resp)=>{
            if(err){throw err}
            else
            {
              callback(null,true);
            }
          });
        }
    }

  }
};

module.exports = pushmodule;
