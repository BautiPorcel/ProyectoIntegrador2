const data = require('../data/data')

const controller = {
    products: function (req,res){
        res.render('product',{
        usuarioLogueado: false
        })
    },

    serchResults: function (req,res){
        res.render('search-results',{
            usuarioLogueado: false
        })
    },

    productsAdd: function (req,res){
        res.render('product-add',{
            usuarioLogueado: true
        })
    },
}

module.exports = controller