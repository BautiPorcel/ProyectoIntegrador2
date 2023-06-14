const data = require('../data/data')
const db = require('../database/models/index')
const op = db.Sequelize.Op
const bcrypt = require('bcryptjs')

const controller = {
    login:function(req,res){
        res.render('login',{
            user: data.usuarios
        })
        },

    registrer: function(req,res){
        res.render('register',{
            user: data.usuarios
        })
        },

        profile: function(req, res) {
            let id = req.session.usuario.id;
          
            db.Clientes.findByPk(id)
              .then(function(usuario) {
                db.Productos.findAll({
                  where: {
                    id_cliente: id
                  }
                })
                  .then(function(productos) {
                    res.render("profile", {
                      usuario: usuario,
                      productos: productos
                    });
                  })
                  .catch(function(err) {
                    console.log(err);
                    res.render("error", { error: "Error al obtener los productos del usuario" });
                  });
              })
              .catch(function(err) {
                console.log(err);
                res.render("error", { error: "Error al obtener el usuario" });
              });
          },

    profileEdit:function(req,res){
        res.render("profile-edit",{
            user: data.usuarios
        })
        },
    usuarioInfo: function(req,res){

        const email = req.query.email
        const usuario = req.query.user
        const password = req.query.password
        const dni = req.query.number
        const cumple = req.query.birthday
        const foto = req.query.profile
        res.send(`Hola ${email}${usuario}${password}${dni}${cumple}${foto}`)
    },

    create: function(req,res){
        let nombre = req.body.nombre
        let email = req.body.email
        let contrasena = req.body.contrasena
        let foto_perfil = req.body.foto_perfil
        let dni = req.body.dni
        let fecha_de_nacimiento = req.body.fecha_de_nacimiento

        if(!email){
            return res.render("register", { error: "Email es un campo obligatorio" })
          }
        if(!contrasena & contrasena.length< 3){
            return res.render("register", { error: "Contraseña debe tener al menos 3 letras" })
          }

        db.Clientes.findOne({
            where: { email },
            raw: true
          })
          .then(function(cliente) {
            if (cliente) {
              return res.render("register", { error: "Email ya está registrado" })
            }

            let passEncriptada = bcrypt.hashSync(contrasena, 12)
            db.Clientes.create({
              nombre,
              email,
              contrasena: passEncriptada,
              dni,
              foto_perfil,
              fecha_de_nacimiento
            })
              .then(function(nuevoCliente){
                res.redirect("/users/login")
              })
              .catch(function(err){
                console.log(err)
              });
          })
          .catch(function(err){
            console.log(err)
          });
      },

    checkUser: function(req,res){
        let {email,contrasena,recordarme} = req.body
        if(!email){
            return res.render("login", { error: "Email es un campo obligatorio" })
         }
        if(!contrasena){
            return res.render("login", { error: "Email es un campo obligatorio" })
        }
        db.Clientes.findOne({
            where:{
                email
            },
            raw:true
        })
        .then(function(cliente){
            let comparacionContrasena = bcrypt.compareSync(contrasena, cliente.contrasena)
            if(comparacionContrasena){
                req.session.usuario = {
                    id: cliente.id,
                    nombre: cliente.nombre,
                    email: cliente.email,
                }
                res.locals.usuario = req.session.usuario
                console.log(res.locals.usuario)
                console.log("arribita")
                console.log(recordarme)
                if(recordarme === "on"){
                    res.cookie(
                        "acordarseUsuario",
                    {
                        id: cliente.id,
                        nombre: cliente.nombre,
                        email: cliente.email,
      
                    },
                    {
                        maxAge: 1000 * 60 * 15
                    },
                    console.log("Pase todo el if")
                )
            }
            res.redirect("/users/profile")
            }
        })
        .catch(function(err){
            console.log(err)
        })
    },
    update: function(req,res){
        let id = req.params.id
        let {nombre,email} = req.body
        db.Clientes.update({
            nombre: nombre,
            email:email
        },{
            where:{
                id:id
            }
        })
        .then(function(resp){
            res.redirect("/users/profile")
        })
        .catch(function(err){
            console.log(err)
        })
    }

}

module.exports = controller