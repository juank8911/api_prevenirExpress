<<<<<<< HEAD
let mysql = require('mysql');
let config = require('../config');
var nodemailer = require('nodemailer');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let emailModel = {};

emailModel.sendMail = (mail,callback)=>{

  transporter = nodemailer.createTransport({
    service: config.mailserv,
    auth: {
        user: config.userMail,
        pass: config.passMail
          }
          });
console.log(mail);

  var mailOptions = {
              from: mail.remitente,
              to: mail.destino,
              subject: mail.asunto,
              text: mail.texto
       }

  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          //console.log(error);
        callback(null,'not send');
      } else {
          console.log("Email sent");
          callback(null,'send');
      }
  });

};
module.exports = emailModel;
=======
let mysql = require('mysql');
let config = require('../config');
var nodemailer = require('nodemailer');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let emailModel = {};

emailModel.sendMail = (mail,callback)=>{

  transporter = nodemailer.createTransport({
    service: config.mailserv,
    auth: {
        user: config.userMail,
        pass: config.passMail
          }
          });
console.log(mail);

  var mailOptions = {
              from: mail.remitente,
              to: mail.destino,
              subject: mail.asunto,
              text: mail.texto
       }

  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          console.log(error);
        //callback(null,'not send');
      } else {
          console.log("Email sent");
          callback(null,'send');
      }
  });

};
module.exports = emailModel;
>>>>>>> 46f9862065a53ceec2545699cc4fdd3cd7cf3cf5
