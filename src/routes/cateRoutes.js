const cate = require('../models/categoria');

module.exports = function (app)
{
  app.get('/categoria',(req,res)=>{
    cate.darCategoria((err,data)=>{
      res.json(data);
    });
  });
}
