const data = require('../data/data')
let db = require("../database/models/index")
let op = db.Sequelize.Op
let bcrypt = require('bcryptjs')
const { Op } = require("sequelize")


const controller = {
    products: function(req, res) {
        const id = req.params.id;
        db.Productos.findByPk(id, { raw: true, include: 'clientes' })
          .then(function(data) {
            if (data) {
              const producto = data;
              const creadorProducto = data.clientes;
      
              res.render('product', {
                producto: producto,
                creadorProducto: creadorProducto
              });
            } else {
              res.render('error', { error: 'Producto no encontrado' });
            }
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

        //let tituloEncriptado = bcrypt.hashSync(req.body.nombre,25)

        //let comparacion = bcrypt.compareSync('NoseporquePepe3000',tituloEncriptado)
        //console.log(comparacion)

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
    }
}

module.exports = controller

