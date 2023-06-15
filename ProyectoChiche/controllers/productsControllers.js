const session = require('express-session')
const data = require('../data/data')
let db = require("../database/models/index")
let op = db.Sequelize.Op
let bcrypt = require('bcryptjs')
const { Op } = require("sequelize")


const controller = {
    products: function(req, res) {
        const id = req.params.id;
        db.Productos.findByPk(id,{ include:[
            {association:'comentarios', 
                include:{association:'clientes'}
            },{association:'clientes'}
        ],order:[
            ['comentarios','created_at','DESC']
        ]})
          .then(function(data) {
              const producto = data;
              const cliente = data.clientes;
              const comentario = data.comentarios

              res.render('product', {
                producto: producto,
                cliente: cliente,
                comentario: comentario
              })
            
          })
          .catch(function(err) {
            console.log(err);
            res.render('error', { error: 'Error al obtener el producto' });
          });
      },
      
      serchResults: function (req, res) {
        let loQueEstoyBuscando = req.query.search;
        
        db.Productos.findAll({
          where: {
            [Op.or]: [
              { nombre: { [Op.like]: `%${loQueEstoyBuscando}%` } },
              { descripcion: { [Op.like]: `%${loQueEstoyBuscando}%` } }
            ]
          },
          order: [['created_at', 'DESC']],
          include: 'clientes' 
        })
          .then(function(data) {
            let encontroResultados;
            console.log(data);
            if (data.length > 0) {
              encontroResultados = true;
            } else {
              encontroResultados = false;
            }
      
            res.render('search-results', {
              resultados: data,
              encontroResultados: encontroResultados,
              busqueda: loQueEstoyBuscando,
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

    productsAdd: function (req,res){
        res.render('product-add',{
            user: data.usuarios
        })
    },
    create:function(req,res){

        db.Productos.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            image: req.body.image,
            id_cliente: req.cookies.acordarseUsuario.id
        })
        .then(function(data){
            res.redirect('/')
        })
        .catch(function(err){
            console.log(err)
        })
    },
    productsEdit: function (req,res){
        const id = req.params.id
        db.Productos.findByPk(id, { include: 'clientes' })
        .then(function(data) {
            if (data) {
              const producto = data;
              const creadorProducto = data.clientes;
      
              res.render('product-edit', {
                producto: producto,
                creadorProducto: creadorProducto
              });
            } else {
              res.render('error', { error: 'Producto no encontrado' });
            }
          })
          .catch(function(err){console.log(err)})
    },
    update: function (req,res){
        let id = req.params.id
        console.log("Abajo esta el id")
        console.log(id)
        let {nombre,descripcion,image} = req.body
        db.Productos.update({
            nombre: nombre,
            descripcion:descripcion,
            image: image
        },{
            where:{
                id:id
            }
        })
        .then(function(resp){
            res.redirect("/users/profile/"+ session.id)
        })
        .catch(function(err){
            console.log(err)
        })
    },
    borrarProducto: function(req, res) {
        const id = req.params.id;
        db.Productos.destroy({ where: { id: id } })
          .then(function() {
            res.redirect('/'); // O redirige a la página de productos o a donde desees después de borrar el producto
          })
          .catch(function(err) {
            console.log(err);
            res.render('error', { error: 'Error al borrar el producto' });
          });
      },
      addComment: function (req,res){
        let comentario = req.body.comentario
        let id = req.session.usuario.id

        db.Comentarios.create({
            comentario: comentario,
            id_cliente: id,
            id_producto: req.body.id_post
        })
        .then(function(data){
            res.redirect('/')
        })
        .catch(function(error){
            console.log(error)
        })
      }

}

module.exports = controller

