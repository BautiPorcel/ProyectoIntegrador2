const data = require('../data/data')

const controller = {
    home:function(req,res){
        res.render('indexx',{
          productos: data.productos,
          productos2 : data.productos2
        })
      },
    headerLogeado: function(req,res){
      res.render('headerLogueado')
    }

}

module.exports = controller