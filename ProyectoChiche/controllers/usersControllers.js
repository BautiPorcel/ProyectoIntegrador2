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
        }
    

}

module.exports = controller