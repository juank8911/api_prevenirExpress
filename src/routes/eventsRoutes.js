const events = require('../models/eventos');
var moment = require('moment');
const jwts = require('../models/jwt');

module.exports = function(app)
{

  //devuelvve la lista de todos los eventos posibles
  app.get('/events',(req,res)=>{
    events.darEvents((err,resp)=>{
      res.json(resp);
    });
  });

//crea eventos
app.post('/events',(req,res)=>{
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
    usuario: req.body.usuario,
    servicio: req.body.servicio
  };
  //console.log(starts + " "+ends);
  events.agregarEvento(eventss,(err,data)=>{
    res.json(data);
  });
});

// retorna eventos segun el id del usuario
app.get('/events/:id',(req,res)=>{
  var id = req.params.id;
  events.darEventsIdUsuario(id,(err,row)=>{
    res.json(row);
  });
});

// retorna eventos segun el id del servicio
app.get('/sevents/:ids',(req,res)=>{
  var ids = req.params.ids;
  events.darEventsIdService(ids,(err,row)=>{
    res.json(row);
  });
});

// elimina eventos segun el id del evento
app.delete('/events/:id',jwts.valida,(req,res)=>{
  var id = req.params.id;
  events.eliminarEvento(id,(err,row)=>{
    res.json(row);
  });
});

app.delete('/eventss/:ide/:idp',jwts.validaAdmin, (req,res)=>{
  let ev = {
    ide:req.params.ide,
    idp: req.params.idp
  };
  //console.log(ev);
  events.delEventProv(ev,(err,resp)=>{
          res.json(resp);
  });
});
}
