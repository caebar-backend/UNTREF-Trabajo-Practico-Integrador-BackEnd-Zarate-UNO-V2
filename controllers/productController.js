const { PRENDASENDB } = require('../models/product')

// 1. Obtener todos los productos
exports.todasLasPrendas = (req, res) => {
    PRENDASENDB.find({})
    .then((prendas) => {
        if(!prendas || prendas.length === 0){
            console.log('\x1b[31m No se pudo acceder a las prendas para mostralas! \x1b[0m')
          return  res.status(500).json({ mensaje: 'No se pudo acceder a las prendas para mostralas!' })
        }
       
        const obtengoPrendas = prendas.map((prenda) => {
            return {
                codigo: prenda.codigo,
                nombre: prenda.nombre,
                precio: prenda.precio,
                categoria: prenda.categoria
            }
        })
        console.log(`\x1b[102m Productos encontrados -> \x1b[0m`)
        console.table(obtengoPrendas)
        console.log('\x1b[102m -------------------------------------------------------------------- \x1b[0m')
        
        
        return res.status(200).json(prendas)
    })
    .catch((ERROR) => {
        console.log('\x1b[31m No se pudo acceder a las prendas para mostralas! -> ->  \x1b[0m', ERROR)
        return res.status(500).json({ mensaje: 'No se pudo acceder a las prendas para mostralas! ', error: ERROR })
    })
}

//////////////////////////////////////////////////////////////////////////////////////////

// 2. Obtener un producto por su código