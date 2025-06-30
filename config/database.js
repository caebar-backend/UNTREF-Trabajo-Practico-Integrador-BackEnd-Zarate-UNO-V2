const mongoose = require('mongoose')
process.loadEnvFile()

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.aii06k7.mongodb.net/${DB_NAME}`

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

module.exports = connectDB