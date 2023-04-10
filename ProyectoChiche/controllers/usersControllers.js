const controller = {
    login:function(req,res){
        res.render('login')
        },

    registrer: function(req,res){
        res.render('register')
        },

    profile:function(req,res){
        res.render("profile")
        },

    profileEdit:function(req,res){
        res.render("profile-edit")
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