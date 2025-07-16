
// Requiero el módulo de express
const express = require('express')
// Asigno a la constante LOGIN la función con el mismo nombre que se encuentra en el archivo userController.js
// Esto sirve para validar y obtener las credenciales para ejecutar acciones senseibles en la aplicación
const { login } = require('../controllers/userController')

// Definimos en la constante router la instancia de express.Router()
const router = express.Router()
// Describo la ruta para la que se accede al usuario y la función que se ejecutará cuando se acceda a esa ruta
router.post('/login', login)

// Exporto la constante router
module.exports = router