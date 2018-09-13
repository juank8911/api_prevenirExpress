const parent = require('../models/parentesco');

module.exports = function (app)
{
  app.get('/parent',(req,res)=>{
    parent.darParent((err,data)=>{
      res.json(data);
    });
  });
}
