// Hago la peticion al módulo express
const express = require('express')
// Solicito la función connectDB que se encuentra en el archivo database.js
const connectDB = require('./config/database')
// Solicito las rutas armadas y las funciones que se van a ejecutar cuando se acceda a esas rutas
const productRoutes = require('./routes/productRoutes')
// Requiero la función rutaNoEncontradaInexistente que se encuentra en el archivo errorController.js
const { rutaNoEncontradaInexistente } = require('./controllers/errorController')
// Traigo la rutina que se encuentra descripta en el archivo actualizarJWTSecret.js para actualizar el JWT_SECRET
const actualizarJWTSecret = require('./utils/actualizarJWTSecret')
// Cargo datos de .env
process.loadEnvFile()
// Creamos una nueva instancia de la clase express en la constante app
const app = express()
// Datos obtenidos del archivo .env
const puerto = process.env.PORT
const alojamiento = process.env.LOCALHOST
// Defino en la constante userRoutes, la rutina para el logueo de usuarios con permisos específicos, incorporando código desde el archivo userRoutes.js
const userRoutes = require('./routes/userRoutes')


// Middleware para poder hacer REQ y RES en formato JSON
app.use(express.json())
// Middleware para definir el tramo inicial de las rutas a usar desde el archivo api.http
app.use('/api/productos', productRoutes)
// Middleware para definir el tramo inicial de las rutas para conseguir el logueo de usuarios
app.use('/api/usuarios', userRoutes)
// Middleware para las peticiones de rutas inexistentes
app.use(rutaNoEncontradaInexistente)

// Función que inicia el servidor
const inicioServidor = () => {
  // Probamos conectarnos a la base de datos en Mongo
  // Probamos poner en funcionamiento el servidor, abriendo puerto y estableciendo url
    try {
        connectDB()
        app.listen(puerto, () => {
        console.log(`\x1b[106m Sistema Iniciado en http://${alojamiento}:${puerto}/ \x1b[0m`)
        })
        // Si no se pudo conectar a la base de datos o no se pudo iniciar el servidor, devuelvo un mensaje de error
        } catch(E){
            console.log('\x1b[31m Error cuándo se iniciaba el servidor -> \x1b[0m', E)
            // Salismos y cerramos proceso
            process.exit(1)
        }

}

// Llamamos a la función inicioServidor
inicioServidor()

// Función que actualiza el JWT_SECRET en el archivo .env
process.on('SIGINT', () => {
  // Llamamos a la función actualizarJWTSecret
  actualizarJWTSecret()
  // Muestro por consola un mensaje
  console.log('🛑 Servidor detenido. JWT_SECRET actualizado aleatoriamente.')
  // Salimos del proceso
  process.exit(0)
})