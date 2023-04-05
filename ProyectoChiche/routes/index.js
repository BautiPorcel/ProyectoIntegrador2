var express = require('express');
var router = express.Router();
var controller = require('/controllers/indexControllers')
/* GET home page. */
router.get('/', indexControllers.home);

module.exports = router;
