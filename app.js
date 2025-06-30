const express = require('express')
const connectDB = require('./config/database')
const productRoutes = require('./routes/productRoutes')
const { rutaNoEncontradaInexistente } = require('./controllers/errorController')
process.loadEnvFile()
const app = express()
const puerto = process.env.PORT
const alojamiento = process.env.LOCALHOST


app.use(express.json())

app.use('/api/productos', productRoutes)

app.use(rutaNoEncontradaInexistente)

const inicioServidor = () => {
    try {
        connectDB()
        app.listen(puerto, () => {
        console.log(`\x1b[106m Sistema Iniciado en http://${alojamiento}:${puerto}/ \x1b[0m`)
        })
        } catch(E){
            console.log('\x1b[31m Error cuándo se iniciaba el servidor -> \x1b[0m', E)
            process.exit(1)
        }

}

inicioServidor()