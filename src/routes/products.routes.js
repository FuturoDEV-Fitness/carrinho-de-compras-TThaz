const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController');
const productsRoutes = new Router()

productsRoutes.post('/', ProductsController.createProduct.bind(ProductsController))
productsRoutes.get('/', ProductsController.listProducts.bind(ProductsController))
productsRoutes.get('/:id', ProductsController.listSingleProducts.bind(ProductsController))

module.exports = productsRoutes