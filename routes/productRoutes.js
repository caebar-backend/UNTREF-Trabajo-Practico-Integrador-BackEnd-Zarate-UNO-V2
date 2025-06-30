const express = require('express')
const controller = require('../controllers/productController')
const { validarEsquemaProducto } = require('../middlewares/validarEsquemaProducto')

const router = express.Router()

router.get('/', controller.todasLasPrendas)
router.get('/:codigo', controller.prendasPorCodigo)
router.post('/', validarEsquemaProducto, controller.agregarProducto)
router.put('/:codigo', controller.modificarProducto)


module.exports = router