const data = require('../data/data')
let db = require("../database/models/index")
let op = db.Sequelize.Op
<<<<<<< HEAD
let bcrypt = require('bcryptjs')
const { Op } = require("sequelize")
=======
//let bcrypt = require('bcryptjs')
>>>>>>> 018751a4f578dbddefd6d2211ca379aead727229

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
        let loQueEstoyBuscando = req.query.search

        db.Productos.findAll({
            where: {
                [Op.or]: [
                  { nombre: { [Op.like]: `%${loQueEstoyBuscando}%` } },
                  { descripcion: { [Op.like]: `%${loQueEstoyBuscando}%` } }
                ]
              },
              order: [['created_at', 'DESC']],
            raw:true
        })
        .then(function(data){
            let encontroResultados

            console.log(data)
            if (data.length > 0){
                encontroResultados = true
            } else {
                encontroResultados= false
            }

        res.render('search-results',{
            usuarioLogueado: false,
            resultados: data,
            encontroResultados: encontroResultados,
            busqueda: loQueEstoyBuscando
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

        let tituloEncriptado = bcrypt.hashSync(req.body.nombre,25)

        let comparacion = bcrypt.compareSync('NoseporquePepe3000',tituloEncriptado)
        console.log(comparacion)

        db.Productos.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.image
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

