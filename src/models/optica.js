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
var sql = 'SELECT historia_opt.*, categoria.nombre FROM historia_opt, servicios,servicios_categoria,categoria WHERE historia_opt.id_servicios = servicios.id_servicios AND servicios.id_servicios = servicios_categoria.servicios_idservicios AND servicios_categoria.categoria_idcategoria = categoria.id_categoria AND  id_usuario = ?;';
connection.query(sql,[id],(err,row)=>{
  if(err){throw err}
  else
  {
    callback(null,row);
  }
})

};

optModule.createHisto = (opt,callback) => {
  // console.log(opt);
var sql = 'INSERT INTO historia_opt (motivoCons, antecedentes, lensometriaOd, lensometriaOi, agudeazaVisualOd, agudeazaVisualOi, visionLejanaOd, visionLejanaOi, visionCercanaOd, visionCercanaOi,adicion, tipoLente, examenExternoOd, examenExternoOi, oftalmologiaOd, oftalmologiaOi, examenMotorOd, examenMotorOi, queratometriaOd, queratometriaOi, refraccionOd, refraccionOi, formulaFinalOd, formulaFinalOi, avvlOd, avvlOi, avvpOd, avvpOi, adicionOd, adicionOi, dnpOd, dnpOi, testIshihara,';
var sql2 ='testEstereopsis,diagnosticoInical,conducta,medicamentos,remision,observaciones,tipo_consulta,rips,id_usuario,id_servicios) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
// console.log(sql+sql2);
connection.query(sql+sql2,[opt.motivoConsulta,opt.antecedentes,opt.lensometriaOd,opt.lensometriaOi,opt.agudezaVisualOd,opt.agudezaVisualOi,opt.visionLejanaOd,opt.visionLejanaOi,opt.visionCercanaOd,opt.visionCercanaOi,opt.adicion,opt.tipoLente,opt.examenExternoOd,opt.examenExternoOi,opt.oftalmologiaOd,opt.oftalmologiaOi,opt.examenMotorOd,opt.examenMotorOi,opt.queratometriaOd,opt.queratometriaOi,opt.refracionOd,opt.refraccionOi,opt.formulaFinalOd,opt.formulaFinalOi,opt.avvlOd,opt.avvlOi,opt.avvpOd,opt.avvpOi,opt.adicionOd,opt.adicionOi,opt.dnpOd,opt.dnpOi,opt.testIshihara,opt.testEstereopsis,opt.diagnosticoInicial,opt.conducta,opt.medicamentos,opt.remision,opt.observaciones,opt.tipoConsulta,opt.rips, opt.id_usuario,opt.id_servicio],(err,row)=>{
  if(err){throw err}
  else
  {
    // console.log('?=)(/&%/()=)(/&/TRUE');
    callback(null,true)
  }
});
};

module.exports = optModule;
