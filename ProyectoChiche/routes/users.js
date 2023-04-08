const express = require("express")
const router = express.Router()
const controller = require("../controllers/usersControllers")

router.get("/login", controller.login)

router.get("/register", controller.registrer)

router.get("/profile",controller.profile )

router.get("/profile-edit", controller.profileEdit)

module.exports = router