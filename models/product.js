const mongoose = require('mongoose')

const prendasSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria:{
        type: [String],
        required: true,

    }
})

const PRENDASENDB = mongoose.model('prendas', prendasSchema)

module.exports = { PRENDASENDB }

