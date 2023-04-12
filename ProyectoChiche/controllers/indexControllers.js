const data = require('../data/data')

const controller = {
    home:function(req,res){
        res.render('indexx',{
          productos: data.productos,
          productos2 : data.productos2,
          usuarioLogueado: false,
          user: data.usuarios
        })
      },

    headerLogeado: function(req,res){
      res.render('headerLogueado',{
          productos: data.productos,
          productos2 : data.productos2,
          usuarioLogueado: true,
          user: data.usuarios
      })
    },

    usuarioInfo: function(req,res){
      const email = req.query.email
      const contra = req.query.password
      res.render(`Hola ${email}, tu contra es ${contra}`
      )}

}


module.exports = controller