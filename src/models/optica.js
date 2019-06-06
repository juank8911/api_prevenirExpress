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
var sql = 'INSERT INTO historia_opt (motivoCons, antecedentes, lensometriaOd, lensometriaOi, agudeazaVisualOd,agudeazaVisualOi, visionLejanaOd, visionLejanaOi, visionCercanaOd, visionCercanaOi,adicion, tipoLente, examenExternoOd, examenExternoOi, oftalmologiaOd, oftalmologiaOi, examenMotorOd, examenMotorOi, queratometriaOd, queratometriaOi, refraccionOd, refraccionOi, formulaFinalOd, formulaFinalOi, avvlOd, avvlOi, avvpOd, avvpOi, adicionOd, adicionOi, dnpOd, dnpOi, testIshihara,';
var sql2 ='testEstereopsis,diagnosticoInical,conducta,medicamentos,remision,observaciones,id_usuario,id_servicios) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
console.log(sql+sql2);
connection.query(sql+sql2,[opt.motivoConsulta,opt.antecedentes,opt.lensometriaOd,opt.lensometriaOi,opt.agudeazaVisualOd,opt.agudeazaVisualOi,opt.visionLejanaOd,opt.visionLejanaOi,opt.visionCercanaOd,opt.visionCercanaOi,opt.adicion,opt.tipoLente,opt.examenExternoOd,opt.examenExternoOi,opt.oftalmologiaOd,opt.oftalmologiaOi,opt.examenMotorOd,opt.examenExternoOi,opt.queratometriaOd,opt.queratometriaOi,opt.refraccionOd,opt.refraccionOi,opt.formulaFinalOd,opt.formulaFinalOi,opt.avvlOd,opt.avvlOi,opt.avvpOd,opt.avvpOi,opt.adicionOd,opt.adicionOi,opt.dnpOd,opt.dnpOi,opt.testIshihara,opt.testEstereopsis,opt.diagnosticoInical,opt.conducta,opt.medicamentos,opt.remision,opt.observaciones, opt.id_usuario,opt.id_servicio],(err,row)=>{
  if(err){callback(null,false)}
  else
  {
    callback(null,true)
  }
});
};

module.exports = optModule;
