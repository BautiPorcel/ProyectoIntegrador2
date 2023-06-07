const data = require('../data/data')
const db = require('../database/models/index')
const op = db.Sequelize.Op


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
        res.render("profile",{
            productos: data.productos,
            usuarioLogueado: true,
            user: data.usuarios
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
        let DNI = req.body.DNI
        let fecha_de_nacimiento = req.body.fecha_de_nacimiento

        let passEncriptada = bcrypt.hashSync(contrasena, 12)
        db.Clientes.create({
            nombre,
            email,
            contrasena: passEncriptada,
            foto_perfil,
            DNI,
            fecha_de_nacimiento

        })
        .then( function(resp){
            console.log(resp.id)
            res.redirect('/users/profile')
        })
        .catch(function(error){
            console.log(error)
        })
        
    }
    

}

module.exports = controller