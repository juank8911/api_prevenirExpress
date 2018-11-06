let mysql = require('mysql');
let config = require('../config');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');
var connection = require('../controler/connection');


connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let emailModel = {};

emailModel.sendMail = (mail,callback)=>{



var  transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
              // user:'contactoprevenir@gmail.com',
              // clientId:'669854799910-42brst8bu1gpn3eh49n5efrd88cn2sg2.apps.googleusercontent.com',
              // clientSeret:'DGVpQslRBho94BcwiTcdzmJp',
              // refreshToken:'1/5SsC1sH4qOr4jDwn9bda19nXrQX3zkRSomdDZ1DY1R0'
              type: 'OAuth2',
              user: 'contactoprevenir@gmail.com',
              clientId: '669854799910-42brst8bu1gpn3eh49n5efrd88cn2sg2.apps.googleusercontent.com',
              clientSecret: 'DGVpQslRBho94BcwiTcdzmJp',
              refreshToken: '1/5SsC1sH4qOr4jDwn9bda19nXrQX3zkRSomdDZ1DY1R0',
              accessToken: 'ya29.Gls-BrbFCF8zI7Rb1LbYJFWNl9JsPRAYdoZTcFe_nXd-XDmmyHlC9YKsWSwSt0Y7VCqcwTNWbtnMEflHjv-JQkhngdMa-iyZQjo_7JhXARYKdvCexkamvfeHn8V2'
            })
          }
          }));
//console.lo.log(mail);

  var mailOptions = {
              from: mail.remite, //config.from,
              to: mail.destino,
              subject: mail.asunto,
              text: mail.texto
       }

  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          //console.lo.log(error);
          callback(null,false);
        //callback(null,'not send');
      } else {
          //console.lo.log("Email sent");
          callback(null,true);
      }
  });

};

emailModel.cuentaBlock = (usu,callback) =>{
  var  transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
              xoauth2: xoauth2.createXOAuth2Generator({
                type: 'OAuth2',
                user: 'contactoprevenir@gmail.com',
                clientId: '669854799910-42brst8bu1gpn3eh49n5efrd88cn2sg2.apps.googleusercontent.com',
                clientSecret: 'DGVpQslRBho94BcwiTcdzmJp',
                refreshToken: '1/5SsC1sH4qOr4jDwn9bda19nXrQX3zkRSomdDZ1DY1R0',
                accessToken: 'ya29.Gls-BrbFCF8zI7Rb1LbYJFWNl9JsPRAYdoZTcFe_nXd-XDmmyHlC9YKsWSwSt0Y7VCqcwTNWbtnMEflHjv-JQkhngdMa-iyZQjo_7JhXARYKdvCexkamvfeHn8V2'
              })
            }
            }));

var mailOptions = {

  from: 'PREVENIR EXPRESS', //config.from,
  to: usu.to,
  subject: 'ACTIVACION CUENTA',
  text: usu.texto,
  html: '<img src="http://cdn.prevenirexpress.com/avatars/banner1a.png" alt="prevenir logo" width="80%" height="50%">'+

  '</br></br><h3>BIENVENIDO A PREVENIR EXPRESS</h3></br><div>Gracias por ser parte de nuesta familia '+
          'en donde encontraras los mejores decuentos medicos de tu ciudad, por favor ingresa este codigo en la aplicacion: <h2>'+ usu.pss + '</h2></div>'};

transporter.sendMail(mailOptions, function(error, info){
    if (error){
        //console.lo.log(error);
        callback(null,false);
      //callback(null,'not send');
    } else {
        //console.lo.log("Email sent");
        callback(null,true);
    }
});


};

emailModel.confirm = (conf,callback) =>{
  if(connection)
{
  let sql = 'SELECT id FROM members WHERE id = ? and salt = ?;'
  connection.query(sql,[conf.id,conf.salt],(err,row)=>{

    if(err)
    {
      callback(null,false);
    }
    else
    {
      row = row[0];
      //console.lo.log(row.id);
      if(row.id==conf.id)
      {
        //console.lo.log('iguales');
        let sql = 'UPDATE members SET locked= 1 WHERE id=?;';
        connection.query(sql,[row.id],(err,rows)=>{
          if(err)
          {

          }
          else
          {
            //console.lo.log(rows);
          if(rows.affectedRows==1)
          {
              //window.close();
              callback(null,true);
          }
          else
          {
          callback(null,false);
          }
          }
        });

      }
      else
      {
        //console.lo.log('algo falla');
        callback(null,false);
      }

    }
  });
}
};



emailModel.sendMailCita = (mail,callback)=>{

console.log('///**/*/*/*/*/*/*/*/* enviando correro');

var  transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
              // user:'contactoprevenir@gmail.com',
              // clientId:'669854799910-42brst8bu1gpn3eh49n5efrd88cn2sg2.apps.googleusercontent.com',
              // clientSeret:'DGVpQslRBho94BcwiTcdzmJp',
              // refreshToken:'1/5SsC1sH4qOr4jDwn9bda19nXrQX3zkRSomdDZ1DY1R0'
              type: 'OAuth2',
              user: 'contactoprevenir@gmail.com',
              clientId: '669854799910-42brst8bu1gpn3eh49n5efrd88cn2sg2.apps.googleusercontent.com',
              clientSecret: 'DGVpQslRBho94BcwiTcdzmJp',
              refreshToken: '1/5SsC1sH4qOr4jDwn9bda19nXrQX3zkRSomdDZ1DY1R0',
              accessToken: 'ya29.Gls-BrbFCF8zI7Rb1LbYJFWNl9JsPRAYdoZTcFe_nXd-XDmmyHlC9YKsWSwSt0Y7VCqcwTNWbtnMEflHjv-JQkhngdMa-iyZQjo_7JhXARYKdvCexkamvfeHn8V2'
            })
          }
          }));
//console.lo.log(mail);
let mailOptions = mail;

  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          //console.lo.log(error);
          callback(null,false);
        //callback(null,'not send');
      } else {
          //console.lo.log("Email sent");
          callback(null,true);
      }
  });

};



emailModel.emailCitaPr = (mail,callback) =>{
  if(connection)
  {
    //console.lo.log(mail);
    callback(null,true);
  }
};







module.exports = emailModel;
