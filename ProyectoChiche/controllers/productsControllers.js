const controller = {
    products: function (req,res){
        res.render('/products')
    },

    serchResults: function (req,res){
        res.render('/search-results')
    },

    productsAdd: function (req,res){
        res.render('/product-add')
    },
    
}

module.exports = controller