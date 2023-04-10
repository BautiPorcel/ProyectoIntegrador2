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
    },
    
    usuarioInfo: function(req,res){
      const email = req.query.email
      const contra = req.query.password
      res.send(`Hola ${email}, tu contra es ${contra}`)
    }

}


module.exports = controller