const express = require("express")
const router = express.Router()
const controller = require("../controllers/productsControllers")

router.get("/products", controller.products)

router.get("/serch-results", controller.serchResults)

router.get("/product-add",controller.productsAdd )


module.exports = router