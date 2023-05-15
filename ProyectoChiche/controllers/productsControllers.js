const data = require('../data/data')

const controller = {
    products: function (req,res){
        const id = req.params.id
        res.render('product',{
        usuarioLogueado: false,
        user: data.usuarios,
        productos: data.productos
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