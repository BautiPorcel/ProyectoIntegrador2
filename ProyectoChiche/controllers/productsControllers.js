//const data = require('../data/data')
// let db = require("../database/models/index")
// let op = db.Sequelize.Op
// let bcryct = requiere("bcryptjs")

const controller = {
    products: function (req,res){
        res.render('product',{
        usuarioLogueado: false,
        productos: data.productos,
        user: data.usuarios
        })
    },

    serchResults: function (req,res){
        res.render('search-results',{
            usuarioLogueado: false,
            productos: data.productos,
            user: data.usuarios
        })
    },

    productsAdd: function (req,res){
        res.render('product-add',{
            usuarioLogueado: true,
            user: data.usuarios
        })
    },
}

module.exports = controller

