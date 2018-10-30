const events = require('../models/eventos');
var moment = require('moment');
const jwts = require('../models/jwt');

module.exports = function(app)
{


  //crea eventos
  app.post('/eventMasc',(req,res)=>{
  //console.log(req.body);
  var Mend = parseInt(00);
  var hinicio = moment(req.body.start).format('HH:mm:ss');
  var Finicio = moment(req.body.start).format('YYYY-MM-DD');
  var horas = hinicio.split(":");
  var mins = horas[1];
  var hora = horas[0];
  hora = parseInt(hora);
  mins = parseInt(mins);
  minsEnd = mins+Mend;
  hora = hora;
  var Hstart = hora+":"+"00"+":00";
  var Hend = hora+1+":"+"00"+":00";
  var starts = Finicio+" "+Hstart;
  var ends = Finicio+" "+Hend;
  //var Hend = moment(ends).format('YYYY-MM-D HH:mm:ss');
  var eventss = {
  color: req.body.color,
  start: starts,
  end: ends,
  mascota: req.body.mascota,
  servicio: req.body.servicio
  };
  //console.log(starts + " "+ends);
  events.agregarEvento(eventss,(err,data)=>{
  res.json(data);
  });
  });




}
