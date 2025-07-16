
// Requiero el modulo de mongoose
const mongoose = require('mongoose')
// Llamo al proceso de carga de datos desde el archivo .env
process.loadEnvFile()
// Obtengo los datos de la base de datos de MongoDB desde el archivo .env
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env

// Creo la conexión a la base de datos de MongoDB usando los datos obtenidos de .env
const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.aii06k7.mongodb.net/${DB_NAME}`

// Función que conecta a la base de datos de MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('\x1b[32m', 'Conexión satisfactoria a la base de datos en MONGODB', '\x1b[0m')
    }catch(E){
        console.log('\x1b[31m', 'No se pudo lograr el vínculo con la base de datos en MONGODB', '\x1b[0m')
        console.log(E)
        console.log('\x1b[31m', 'Verifique que la base de datos esté corriendo y que el usuario y la contraseña sean correctos', '\x1b[0m')
        process.exit(1)
    }
}
// Exporto la función connectDB (conexión a la base de datos de MongoDB)
module.exports = connectDB