let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let optModule = {};



optModule.darDatosUsu = (id,callback) => {
var sql = 'SELECT * FROM historia_opt WHERE id_usuario = ?;';
connection.query(sql,[id],(err,row)=>{
  if(err){throw err}
  else
  {
    callback(null,row);
  }
})

};

optModule.createHisto = (opt,callback) => {
var sql = 'INSERT INTO historia_opt (motivoCons, antecedentes, lensometriaOd, lensometriaOi, agudeazaVisualOd, agudeazaVisualOi, visionLejanaOd, visionLejanaOi, visionCercanaOd, visionCercanaOi, adicion, tipoLente, examenExternoOd, examenExternoOi, oftalmologiaOd, oftalmologiaOi, examenMotorOd, examenMotorOi, queratometriaOd, queratometriaOi, refraccionOd, refraccionOi, formulaFinalOd, formulaFinalOi, avvlOd, avvlOi, avvpOd, avvpOi, adicionOd, adicionOi, dnpOd, dnpOi, testIshihara, testEstereopsis, diagnosticoInical, conducta, medicamentos, remision, observaciones,id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
connection.query(sql,[opt],(err,row)=>{
  if(err){throw err}
  else
  {
    callback(null,row)
  }
});
};

module.exports = optModule;
