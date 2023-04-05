var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexControllers');
var data = require('../data/data');


/* GET home page. */
router.get('/', indexControllers.home);

module.exports = router;
