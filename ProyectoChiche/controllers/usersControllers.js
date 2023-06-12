const data = require('../data/data')
const db = require('../database/models/index')
const op = db.Sequelize.Op
const bcrypt = require('bcryptjs')

const controller = {
    login:function(req,res){
        res.render('login',{
            usuarioLogueado: false,
            user: data.usuarios
        })
        },

    registrer: function(req,res){
        res.render('register',{
            usuarioLogueado: false,
            user: data.usuarios
        })
        },

    profile: function(req,res){
        let id = req.session.Clientes.id
        db.Clientes.findByPk(id)
        .then(function(usuario){
        res.render("profile",{
            usuarioLogueado: true,
            usuario: usuario})
        })
        .catch(function(err){
            console.log(err)
        })
        },

    profileEdit:function(req,res){
        res.render("profile-edit",{
            usuarioLogueado: true,
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

        let passEncriptada = bcrypt.hashSync(contrasena, 12)
        db.Clientes.create({
            nombre,
            email,
            contrasena: passEncriptada,
            dni,
            foto_perfil,
            fecha_de_nacimiento,
           
        })

        .then(function(resp){
            console.log(resp)
            res.redirect('/users/profile')
        })
        .catch(function(error){
            console.log(error)
        })
        
    },

    checkUser: function(req,res){
        let {email,contrasena,remeberMe} = req.body
        db.Clientes.findOne({
            where:{
                email
            },
            raw:true
        })
        .then(function(cliente){
            let comparacionContrasena = bcrypt.compareSync(contrasena, cliente.contrasena)
            console.log('Pasa por el then')
            if(comparacionContrasena){
                req.session.Clientes = {
                    id: cliente.id,
                    nombre: cliente.nombre,
                    email: cliente.email,

                }
                res.locals.usuario = req.session.Clientes

                if(remeberMe === "on"){
                    res.cookie(
                        "redordarme",
                    {
                        id: cliente.id,
                        nombre: cliente.name,
                        email: cliente.email,
                    }
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
            res.redirect("/users/profile"+ id)
        })
        .catch(function(err){
            console.log(err)
        })
    }

    

}

module.exports = controller