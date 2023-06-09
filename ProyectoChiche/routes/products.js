const express = require("express")
const router = express.Router()
const controller = require("../controllers/productsControllers")

router.get("/products/:id", controller.products)

router.get("/search-results", controller.serchResults)
router.post('/add-comment', controller.addComment)

router.get("/product-add",controller.productsAdd )
router.post("/product-add/create",controller.create )

router.get("/product-edit/:id", controller.productsEdit)
router.post("/product-edit/:id", controller.update)
router.post("/productDelete/:id", controller.borrarProducto)


module.exports = router

