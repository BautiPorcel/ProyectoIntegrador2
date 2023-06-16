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
            let id = req.params.id

            db.Clientes.findByPk(id, {include:[
                {association:'comentarios', 
                    include:{association:'clientes'}
                },{association:'productos'}
          ]})
             
                .then(function(data) {
                    res.render("profile", {
                      usuario: data
                    })
                  })
                .catch(function(err) {
                    console.log(err)
                  })
              
             
          },

    profileEdit:function(req,res){
        res.render("profile-edit",{
            user: data.usuarios
        })
        },

        //No esta en uso
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
        //Se puede hacer de otra forma, pero lo hacemos asi para ver todas las formas
        let nombre = req.body.nombre
        let email = req.body.email
        let contrasena = req.body.contrasena
        let foto_perfil = req.body.foto_perfil
        let dni = req.body.dni
        let fecha_de_nacimiento = req.body.fecha_de_nacimiento
        let errors = {}

            if(email == ""){
                errors.message = "Falta completar el email"
                res.locals.errors = errors
                res.render("register")
            }if(contrasena === "" & contrasena.length< 3){
                errors.message = "Falta completar la contrasena"
                res.locals.errors = errors
                res.render("register")
            }

        db.Clientes.findOne({
            where: { email },
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
              })
          })
          .catch(function(err){
            console.log(err)
          })
      },

    checkUser: function(req,res){

        let {email,contrasena,recordarme} = req.body

        db.Clientes.findOne({
            where:{
                email
            },
        })

        .then(function(cliente){
            let comparacionContrasena = bcrypt.compareSync(contrasena, cliente.contrasena)
            let errors = ""
            let falso = false

            if(comparacionContrasena === falso){
                errors.message = "la contraseña no es valida"
                res.locals.errors = errors
                return res.render("login")
            }

            if(comparacionContrasena){
                req.session.usuario = {
                    id: cliente.id,
                    nombre: cliente.nombre,
                    email: cliente.email,
                }
                //Se define el usuario

                res.locals.usuario = req.session.usuario
                //Se introduce el usuario en locals

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
                )
            }

            res.redirect("/users/profile/" + cliente.id)
            }
        })
        .catch(function(err){
            console.log(err)
            let errores = {}
            errores.message = "El mail ingresado no es valido"
            res.locals.errors = errors
            res.render("login")
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