const express = require("express")
const router = express.Router()
const controller = require("../controllers/usersControllers")

router.get("/login", controller.login)
router.post("/login", controller.checkUser)

router.get("/register", controller.registrer)
router.post("/register", controller.create)

router.get("/profile",controller.profile )

router.get("/profile-edit", controller.profileEdit)

router.get("/infoDelUsuario", controller.usuarioInfo)

module.exports = router