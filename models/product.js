
// Requiero el módulo mongoose
const mongoose = require('mongoose')

// Creamos un esquema para el modelo prendas
const prendasSchema = new mongoose.Schema({
    // Difino pares clave-valor, tipo de dato, y si es obligatorio
    codigo: {
        type: Number,
        required: true,
    },
    // Difino pares clave-valor, tipo de dato, y si es obligatorio
    nombre: {
        type: String,
        required: true,
    },
    // Difino pares clave-valor, tipo de dato, y si es obligatorio
    precio: {
        type: Number,
        required: true,
    },
    // Difino pares clave-valor, tipo de dato, y si es obligatorio
    categoria:{
        type: [String],
        required: true,

    }
})

// Asigno a la constante PRENDASENDB el modelo mongoose.model('prendas', prendasSchema)
const PRENDASENDB = mongoose.model('prendas', prendasSchema)

// Exporto la constante PRENDASENDB
module.exports = { PRENDASENDB }

