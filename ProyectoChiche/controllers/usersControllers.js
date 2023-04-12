const data = require('../data/data')

const controller = {
    login:function(req,res){
        res.render('login',{
            usuarioLogueado: false
        })
        },

    registrer: function(req,res){
        res.render('register',{
            usuarioLogueado: false
        })
        },

    profile:function(req,res){
        res.render("profile",{
            productos: data.productos,
            usuarioLogueado: true,
            user: data.usuarios
        })
        },

    profileEdit:function(req,res){
        res.render("profile-edit",{
            usuarioLogueado: true
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
    }
    

}

module.exports = controller