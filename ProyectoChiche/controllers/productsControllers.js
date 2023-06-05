const data = require('../data/data')
let db = require("../database/models/index")
let op = db.Sequelize.Op
//let bcrypt = require('bcryptjs')

const controller = {
    products: function (req,res){
        const id = req.params.id
        db.Productos.findByPk(id,{raw: true})
        .then(function(data){
            res.render('product',{
            usuarioLogueado: false,
            productos: data,
            //user: data.usuarios
            })
        })
        .catch(function(err){
            console.log(err)
        })
    },

    serchResults: function (req,res){
        let loQueEstoyBuscando = req.query.busqueda

        db.Productos.findAll({
            where:{
                nombre: {
                    [op.like]: `%${loQueEstoyBuscando}%`
                }
            },
            raw:true
        })
        .then(function(data){
            let encontroResultados
            if (data.length > 0){
                encontroResultados = true
            } else {
                encontroResultados= false
            }

        res.render('search-results',{
            usuarioLogueado: false,
            productos: data.productos,
            user: data.usuarios
        })
    })
        .catch(function(err){
            console.log(err)
        })
        
    },

    productsAdd: function (req,res){
        res.render('product-add',{
            usuarioLogueado: true,
            user: data.usuarios
        })
    },
    create:function(req,res){

        let tituloEncriptado = bcrypt.hashSync(req.body.nombre,10)

        let comparacion = bcrypt.compareSync('NoseporquePepe3000',tituloEncriptado)

        db.Productos.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        })
        .then(function(data){
            res.redirect('/')
        })
        .catch(function(err){
            console.log(err)
        })
    }
}

module.exports = controller

