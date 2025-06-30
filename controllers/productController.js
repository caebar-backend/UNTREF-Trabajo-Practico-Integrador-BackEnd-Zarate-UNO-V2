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
// 2.1 Obtener un producto con un código inexistente (debería dar 404)

exports.prendasPorCodigo = (req, res) => {
    const codigoSP = req.params.codigo
    const codigoParseado = parseInt(codigoSP)
    if(isNaN(codigoParseado)){
            console.log('\x1b[31m El código ingresado no es numérico! \x1b[0m')
            return res.status(400).json({ mensaje: 'El código ingresado no es numérico!'})
        }
    PRENDASENDB.find({ codigo: codigoParseado})
    .then((prenda) => {
        if(!prenda || prenda.length === 0){
            console.log('\x1b[31m No existe un producto con ese código! \x1b[0m')
            return res.status(404).json({ mensaje: 'No existe un producto con ese código!'})
        }
        // --- MAPEO + Console.table para mostrar x consola el producto en la Base de datos ----
        
        const existePrenda = prenda.map((prendita) => {
            return {
                codigo: prendita.codigo,
                nombre: prendita.nombre,
                precio: prendita.precio,
                categoria: prendita.categoria
            }
        })
    
        console.log(`\x1b[103m Producto encontrado con el código -> ${codigoParseado} <- : \x1b[0m`)
        console.table(existePrenda)
        console.log('\x1b[103m -------------------------------------------------------------------- \x1b[0m')
        //---------------------------
        return res.status(200).json(prenda)
    })
    .catch((ERROR) => {
        console.log('\x1b[31m No se pudo acceder a la prenda con ese código! -> \x1b[0m', ERROR)
        return res.status(500).json({ mensaje: 'No se pudo acceder a la prenda con ese código!', error: ERROR })
    })
}

//////////////////////////////////////////////////////////////////////////////////////////


