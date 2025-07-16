// Solicito el módulo de express
const express = require('express')
// Solicito las funciones diseñadas para establecer las rutas
const controller = require('../controllers/productController')
// Requiero el middleware validarEsquemaProducto
const { validarEsquemaProducto } = require('../middlewares/validarEsquemaProducto')
// Requiero el middleware auth
const verificarToken = require('../middlewares/auth')
// Definimos en la constante router la instancia de express.Router()
const router = express.Router()
// Indico la ruta raíz y la función que se ejecutará cuando se acceda a esa ruta
router.get('/', controller.todasLasPrendas)
// Indico la ruta /buscar y la función que se ejecutará cuando se acceda a esa ruta
router.get('/buscar', controller.buscarProductoPorCoincidenciaEnNombre)
// Señalo la ruta /:codigo y la función que se ejecutará cuando se acceda a esa ruta
router.get('/:codigo', controller.prendasPorCodigo)
// Señalo la ruta /precio/:min/:max y la función que se ejecutará cuando se acceda a esa ruta
router.get('/precio/:min/:max', controller.busquedaPorRangoDePrecio)
// Describo la ruta para agregar un producto, y los middlewares que se aplicarán a esa ruta, también la función que se ejecutará cuando se acceda a esa ruta
router.post('/', verificarToken, validarEsquemaProducto, controller.agregarProducto)
// Describo la ruta para agregar múltiples productos, y los middlewares que se aplicarán a esa ruta, también la función que se ejecutará cuando se acceda a esa ruta
router.post('/masivo', verificarToken, validarEsquemaProducto, controller.agregarProductosMasivos)
// Especifico la ruta para modificar un producto, y los middlewares que se aplicarán a esa ruta, también la función que se ejecutará cuando se acceda a esa ruta
router.put('/:codigo', verificarToken, controller.modificarProducto)
// Especifico la ruta para eliminar un producto, y los middlewares que se aplicarán a esa ruta, también la función que se ejecutará cuando se acceda a esa ruta
router.delete('/:codigo', verificarToken, controller.eliminarProducto)
// Inscribo la ruta para filtrar productos por categoría
router.get('/categoria/:categoria', controller.filtrarProductoPorCategoria)

// Exporto la constante router
module.exports = router