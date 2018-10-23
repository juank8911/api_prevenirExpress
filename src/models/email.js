let mysql = require('mysql');
let config = require('../config');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');


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
console.log(mail);

  var mailOptions = {
              from: mail.remite, //config.from,
              to: mail.destino,
              subject: mail.asunto,
              text: mail.texto
       }

  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          console.log(error);
          callback(null,false);
        //callback(null,'not send');
      } else {
          console.log("Email sent");
          callback(null,true);
      }
  });

};
module.exports = emailModel;
