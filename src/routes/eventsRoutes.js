const events = require('../models/eventos');
var moment = require('moment');

module.exports = function(app)
{
  app.get('/events',(req,res)=>{
    events.darEvents((err,resp)=>{
      res.json(resp);
    });
  });


app.post('/events',(req,res)=>{
  var Mend = parseInt(req.body.end);
  var hinicio = moment(req.body.start).format('HH:mm:ss');
  var Finicio = moment(req.body.start).format('YYYY-MM-DD');
  var horas = hinicio.split(":");
  var mins = horas[1];
  var hora = horas[0];
  hora = parseInt(hora)+5;
  mins = parseInt(mins);
  minsEnd = mins+Mend;
  var Hstart = hora+":"+"00"+":00";
  var Hend = hora+":"+minsEnd+":00";
  var starts = Finicio+" "+Hstart;
  var ends = Finicio+" "+Hend;
  //var Hend = moment(ends).format('YYYY-MM-D HH:mm:ss');
  var eventss = {
    color: req.body.color,
    start: starts,
    end: ends,
    usuario: req.body.id_usuario,
    servicio: req.body.id_servicio
  };
  console.log(starts + " "+ends);
  events.agregarEvento(eventss,(err,data)=>{
    res.json(data);
  });
});

app.get('/events/:id',(req,res)=>{
  var id = req.params.id;
  events.darEventsIdUsuario(id,(err,row)=>{
    res.json(row);
  });
});

app.get('/sevents/:ids',(req,res)=>{
  var ids = req.params.ids;
  events.darEventsIdService(ids,(err,row)=>{
    res.json(row);
  });
});
}
