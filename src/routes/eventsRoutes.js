const events = require('../models/eventos');

module.exports = function(app)
{
  app.get('/events',(req,res)=>{
    events.darEvents((err,resp)=>{
      res.json(resp);
    });
  });


app.post('/events',(req,res)=>{
  var eventss = {
    color: req.body.color,
    start: req.body.start,
    end: req.body.end,
    usuario: req.body.id_usuario,
    servicio: req.body.id_servicio
  };
  console.log(eventss);
  //events.agregarEvento(eventss,(err,data)=>{
    res.json(eventss);
//  });
});

app.get('/events/:id',(req,res)=>{
  var id = req.params.id;
  events.darEventsIdUsuario(id,(err,row)=>{
    res.json(row);
  });
});
}
