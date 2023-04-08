const controller = {
    login:function(req,res){
        res.render('login')
        },

    registrer: function(req,res){
        res.render('register')
        },

    profile:function(req,res){
        res.send("Aca tengo que poner el profile")
        },

    profileEdit:function(req,res){
        res.send("Aca tengo que poner el edit-profile")
        }
    

}

module.exports = controller