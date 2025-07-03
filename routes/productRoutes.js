const express = require('express')
const controller = require('../controllers/productController')
const { validarEsquemaProducto } = require('../middlewares/validarEsquemaProducto')
const verificarToken = require('../middlewares/auth')

const router = express.Router()

router.get('/', controller.todasLasPrendas)
router.get('/buscar', controller.buscarProductoPorCoincidenciaEnNombre)
router.get('/:codigo', controller.prendasPorCodigo)
router.get('/precio/:min/:max', controller.busquedaPorRangoDePrecio)
router.post('/', verificarToken, validarEsquemaProducto, controller.agregarProducto)
router.post('/masivo', verificarToken, validarEsquemaProducto, controller.agregarProductosMasivos)
router.put('/:codigo', verificarToken, controller.modificarProducto)
router.delete('/:codigo', verificarToken, controller.eliminarProducto)
router.get('/categoria/:categoria', controller.filtrarProductoPorCategoria)


module.exports = router