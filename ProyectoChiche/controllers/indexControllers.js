const data = require('../data/data')
const db = require('../database/models/index')
const op = db.Sequelize.Op

const controller = {
    home:function(req,res){
      db.Productos.findAll({
        raw: true,
        nest: true,
        include:[{association: 'clientes'}
         ]
      })
    .then(function(data){
      console.log(data)
      res.render('indexx',{
          productos: data,
          productos2 : data,
          usuarioLogueado: false,
          user: data.usuarios})
        })
      .catch(function(err){console.log(err)})
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