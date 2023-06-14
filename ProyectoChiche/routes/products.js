const express = require("express")
const router = express.Router()
const controller = require("../controllers/productsControllers")

router.get("/products/:id", controller.products)

router.get("/search-results", controller.serchResults)

router.get("/product-add",controller.productsAdd )
router.post("/product-add/create",controller.create )

router.post("/product-edit", controller.productsEdit)

module.exports = router

