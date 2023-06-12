var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexControllers')

router.get('/', controller.home )
router.post("/", controller.logout)

router.get('/headerLogueado',controller.headerLogeado)

router.get("/Cuenta", controller.usuarioInfo)


module.exports = router
