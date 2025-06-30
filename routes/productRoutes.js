const express = require('express')
const controller = require('../controllers/productController')
const { validarEsquemaProducto } = require('../middlewares/validarEsquemaProducto')

const router = express.Router()

router.get('/', controller.todasLasPrendas)


module.exports = router