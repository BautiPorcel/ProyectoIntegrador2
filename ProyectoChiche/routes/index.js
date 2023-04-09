var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexControllers')

router.get('/', controller.home )
router.get('/headerLogueado',controller.headerLogeado)

module.exports = router
