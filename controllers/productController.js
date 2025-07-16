// Requiero el modelo / Esquema de la base de datos
const { PRENDASENDB } = require('../models/product')

// 1. Obtener todos los productos
exports.todasLasPrendas = (req, res) => {
    // Llamo al método find de la colección PRENDASENDB
    PRENDASENDB.find({})
    .then((prendas) => {
        // Si no se pudo acceder a las prendas, devuelvo un mensaje de error
        if(!prendas || prendas.length === 0){
            console.log('\x1b[31m No se pudo acceder a las prendas para mostralas! \x1b[0m')
          return  res.status(500).json({ mensaje: 'No se pudo acceder a las prendas para mostralas!' })
        }
       // Mapeo de las prendas para mostrarlas en consola
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
        
        // Devuelvo los productos encontrados en la colección
        return res.status(200).json(prendas)
    })
    // Si no se pudo acceder a las prendas, devuelvo un mensaje de error
    .catch((ERROR) => {
        console.log('\x1b[31m No se pudo acceder a las prendas para mostralas! -> ->  \x1b[0m', ERROR)
        return res.status(500).json({ mensaje: 'No se pudo acceder a las prendas para mostralas! ', error: ERROR })
    })
}

//////////////////////////////////////////////////////////////////////////////////////////

// 2. Obtener un producto por su código
// 2.1 Obtener un producto con un código inexistente (debería dar 404)

exports.prendasPorCodigo = (req, res) => {
    // Obtengo el código del producto
    const codigoSP = req.params.codigo
    // Parseo el código del producto
    const codigoParseado = parseInt(codigoSP)
    // Si el código del producto no es numérico, devuelvo un mensaje de error
    if(isNaN(codigoParseado)){
            console.log('\x1b[31m El código ingresado no es numérico! \x1b[0m')
            return res.status(400).json({ mensaje: 'El código ingresado no es numérico!'})
        }
        // Llamo al método find de la colección PRENDASENDB
    PRENDASENDB.find({ codigo: codigoParseado})
    .then((prenda) => {
        // Si no se pudo acceder a la prenda, devuelvo un mensaje de error
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
        // Devuelvo el producto encontrado en la colección
        return res.status(200).json(prenda)
    })
    // Si no se pudo acceder a la prenda, devuelvo un mensaje de error
    .catch((ERROR) => {
        console.log('\x1b[31m No se pudo acceder a la prenda con ese código! -> \x1b[0m', ERROR)
        return res.status(500).json({ mensaje: 'No se pudo acceder a la prenda con ese código!', error: ERROR })
    })
}

//////////////////////////////////////////////////////////////////////////////////////////

// 3. Crear un nuevo producto
exports.agregarProducto = (req, res) => {
    // Creamos una nueva instancia de la clase PRENDASENDB
    const nuevaPrenda = new PRENDASENDB({ ...req.body })
    // Llamo al método findOne de la colección PRENDASENDB
    PRENDASENDB.findOne({ codigo: nuevaPrenda.codigo })
        .then((prendaExistente) => {
            // Si la prenda existe en la base de datos, devuelvo un mensaje de error
            if (prendaExistente) {
                console.log('\x1b[33m Ya existe una prenda con ese código! \x1b[0m')
                return res.status(409).json({ mensaje: 'Ya existe una prenda con ese código!' })
            }
            // Llamo al método save de la instancia nuevaPrenda para guardar la nueva prenda
            nuevaPrenda.save()

            const agregadaPrenda = {
                    codigo: nuevaPrenda.codigo,
                    nombre: nuevaPrenda.nombre,
                    precio: nuevaPrenda.precio,
                    categoria: nuevaPrenda.categoria
                }
                // Devuelvo el producto agregado en la colección para ser mostrado en consola
            console.log(`\x1b[102m Se agregó un nuevo producto a la base de datos con el código ${agregadaPrenda.codigo}  \x1b[0m`)
            console.table(agregadaPrenda)
            console.log('\x1b[102m -------------------------------------------------------------------- \x1b[0m')
            // Devuelvo el producto agregado en la colección
            return res.status(201).json({ mensaje: ['Nuevo producto agregado a la Base de Datos', nuevaPrenda] })
        })
           // Si no se pudo agregar el producto a la base de datos, devuelvo un mensaje de error
        .catch((ERROR) => {
            console.log('\x1b[31m No se pudo agregar el producto a la base de datos! ->  \x1b[0m', ERROR)
            return res.status(500).json({ mensaje: 'Error en el servidor al agregar el producto.', error: ERROR })
        })
}

////////////////////////////////////////////////////////

// 4. Modificar un producto existente
exports.modificarProducto = (req, res) => {
    // Obtengo el código ingresado del producto
    const codigoSP = req.params.codigo
    // Parseo el código ingresado del producto
    const codigoParseado = parseInt(codigoSP)
        // Si el código ingresado del producto no es numérico, devuelvo un mensaje de error
    if(isNaN(codigoParseado)){
            console.log('\x1b[31m El código ingresado no es numérico! \x1b[0m')
            return res.status(400).json({ mensaje: 'El código ingresado no es numérico!'})
        }
        // Si el código ingresado del producto es negativo, devuelvo un mensaje de error
    if(codigoParseado < 0){
        console.log('\x1b[31m El código ingresado no es numérico POSITIVO! \x1b[0m')
        return res.status(400).json({ mensaje: 'El código ingresado no es numérico POSITIVO!'})
    }
        // Llamo al método findOneAndUpdate de la colección PRENDASENDB
        PRENDASENDB.findOneAndUpdate({ codigo: codigoParseado }, { ...req.body })
        .then((prenda) => {
            // Si la prenda no existe en la base de datos, devuelvo un mensaje de error
            if(!prenda){
                console.log('\x1b[31m No existe un producto con ese código! \x1b[0m')
                return res.status(404).json({ mensaje: 'No existe un producto con ese código!'})
            }
            // Guardo en la constante existePrenda los datos de la prenda modificada 
            const existePrenda = {
                    codigo: codigoParseado,
                    ...req.body
                }
            // Muestro por consola los datos de la prenda modificada
            console.log(`\x1b[103m Producto modificado con el código -> ${codigoParseado} <- : \x1b[0m`)
            console.log('\x1b[32m Se modificó un producto en la base de datos con el código -> \x1b[0m', codigoParseado)
            console.table(existePrenda)
            console.log('\x1b[103m -------------------------------------------------------------------- \x1b[0m')
            // Devuelvo los datos de la prenda modificada en la colección
            return res.status(200).json({ mensaje: ['Producto modificado en la Base de Datos', existePrenda] })
            
        })
         // Si no se pudo modificar el producto en la base de datos, devuelvo un mensaje de error
        .catch((ERROR) => {
            console.log('\x1b[31m No se pudo modificar el producto en la base de datos! -> \x1b[0m', ERROR)
            return res.status(500).json({ mensaje: 'Error en el servidor al modificar el producto.', error: ERROR })
        })
}

/////////////////////////////////////////////////////////////////

// 5. Eliminar un producto
exports.eliminarProducto = (req, res) => {
    // Obtengo el código del producto
    const codigoSP = req.params.codigo
    // Parseo el código del producto
    const codigoParseado = parseInt(codigoSP)
        // Si el código del producto no es numérico, devuelvo un mensaje de error
    if(isNaN(codigoParseado)){
            console.log('\x1b[31m El código ingresado no es numérico! \x1b[0m')
            return res.status(400).json({ mensaje: 'El código ingresado no es numérico!'})
        }
        // Si el código del producto es negativo, devuelvo un mensaje de error
    if(codigoParseado < 0){
        console.log('\x1b[31m El código ingresado no es numérico POSITIVO! \x1b[0m')
        return res.status(400).json({ mensaje: 'El código ingresado no es numérico POSITIVO!'})
    }
        // Llamo al método findOneAndDelete de la colección PRENDASENDB
        PRENDASENDB.findOneAndDelete({ codigo: codigoParseado })
        .then((prenda) => {
            // Si la prenda no existe en la base de datos, devuelvo un mensaje de error
            if(!prenda){
                console.log('\x1b[31m No existe un producto con ese código! \x1b[0m')
                return res.status(404).json({ mensaje: 'No existe un producto con ese código!'})
            }
            // Guardo en la constante eliminadaPrenda los datos de la prenda eliminada
            const eliminadaPrenda = {
                    codigo: codigoParseado,
                    nombre: prenda.nombre,
                    precio: prenda.precio,
                    categoria: prenda.categoria
                }
            // Muestro por consola los datos de la prenda eliminada
            console.log(`\x1b[102m Producto eliminado con el código -> ${codigoParseado} <- : \x1b[0m`)
            console.log('\x1b[32m Se eliminó un producto en la base de datos con el código -> \x1b[0m', codigoParseado)
            console.table(eliminadaPrenda)
            console.log('\x1b[102m -------------------------------------------------------------------- \x1b[0m')
            // Devuelvo los datos de la prenda eliminada en la colección
            return res.status(200).json({ mensaje: ['Producto eliminado en la Base de Datos', eliminadaPrenda] })
            
        })
         // Si no se pudo eliminar el producto en la base de datos, devuelvo un mensaje de error
        .catch((ERROR) => {
            console.log('\x1b[31m No se pudo eliminar el producto en la base de datos! -> \x1b[0m', ERROR)
            return res.status(500).json({ mensaje: 'Error en el servidor al eliminar el producto.', error: ERROR })
        })
}
/////////////////////////////////////////////////////////////////////////////////

// 6. Buscar productos por término

exports.buscarProductoPorCoincidenciaEnNombre = (req, res) => {
    // Obtengo el término de búsqueda 
    const { q } = req.query
    // Si no se ingresó el parámetro q, devuelvo un mensaje de error
    if (!q) {
        console.log('\x1b[31m No se ingresó el parámetro q! \x1b[0m')
        return res.status(400).json({ mensaje: 'No se ingresó el parámetro q!' })
    }
    // Llamo al método aggregate de la colección PRENDASENDB
    PRENDASENDB.aggregate([
        {
            $match: {
                nombre: { 
                    $regex: q, 
                    $options: 'i' 
                }
            }
        }
    ])

    .then((prenda) => {
        // Si no se pudo acceder a las prendas con ese nombre, devuelvo un mensaje de error
        if (!prenda || prenda.length === 0) {
            console.log('\x1b[31m No existe un producto con ese nombre! \x1b[0m')
            return res.status(404).json({ mensaje: 'No existe un producto con ese nombre!' })
        }
        // Mapeo de las prendas para mostrarlas en consola
        const existePrenda = prenda.map((prendita) => {
            return {
                codigo: prendita.codigo,
                nombre: prendita.nombre,
                precio: prendita.precio,
                categoria: prendita.categoria
            };
        });
        // Muestro por consola los productos encontrados
        console.log(`\x1b[103m Productos encontrados -> \x1b[0m`)
        console.table(existePrenda)
        console.log('\x1b[103m -------------------------------------------------------------------- \x1b[0m')
        // Devuelvo los productos encontrados en la colección
        return res.status(200).json(prenda)
    })
    // Si no se pudo acceder a las prendas con ese nombre, devuelvo un mensaje de error
    .catch((ERROR) => {
        console.log('\x1b[31m No se pudo acceder a las prendas con ese nombre! -> \x1b[0m', ERROR)
        return res.status(500).json({ mensaje: 'No se pudo acceder a las prendas con ese nombre!', error: ERROR })
    })
}
////////////////////////////////////////////////////////////////////////////////

// 7. Filtrar productos por categoria

exports.filtrarProductoPorCategoria = (req, res) => {
    // Obtengo la categoria del producto y la guardo en la constante categoria
    const { categoria } = req.params
    // Verifico si se ingresó el parámetro categoria
    // Si no se ingresó el parámetro categoria, devuelvo un mensaje de error
    if(!categoria){
        console.log('\x1b[31m No se ingresó el parámetro categoria! \x1b[0m')
        return res.status(400).json({ mensaje: 'No se ingresó el parámetro categoria!'})
    }
    // Llamo al método find de la colección PRENDASENDB estableciendo el parámetros en la busqueda para que mongoDB devuelva solo los productos que coincidan
    // Uso expresiones regulares para buscar productos...
    PRENDASENDB.find({categoria : {"$regex": `(?i)^\\s*${categoria}\\s*$`}})
    .then((prenda) => {
        // Si no se pudo acceder a las prendas con esa categoria, devuelvo un mensaje de error
        if(!prenda || prenda.length === 0){
            console.log('\x1b[31m No existe un producto con ese categoria! \x1b[0m')
            return res.status(404).json({ mensaje: 'No existe un producto con ese categoria!'})
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
        //------------------------------------------------------------------
        // Muestro por consola los productos encontrados
        console.log(`\x1b[102m Productos encontrados -> \x1b[0m`)
        console.table(existePrenda)
        console.log('\x1b[102m -------------------------------------------------------------------- \x1b[0m')
        //---------------------------
        // Devuelvo los productos encontrados en la colección
        return res.status(200).json(prenda)
    })
    // Si no se pudo acceder a las prendas con ese categoria, devuelvo un mensaje de error
    .catch((ERROR) => {
        console.log('\x1b[31m No se pudo acceder a las prendas con ese categoria! -> \x1b[0m', ERROR)
        return res.status(500).json({ mensaje: 'No se pudo acceder a las prendas con ese categoria!', error: ERROR })
    })
}
////////////////////////////////////////////////////////////////////////////////


// 8. Filtrar productos por rango de precio

exports.busquedaPorRangoDePrecio = (req, res) => {
    // Obtengo los rangos de precios de los productos y la guardos en las constantes min y max
    const { min } = req.params
    const { max } = req.params
    // Verifico si se ingresaron los parámetros min y max
    // Si no se ingresaron los parámetros min o max, devuelvo un mensaje de error
    if(!min || !max){
        console.log('\x1b[31m No se ingresó el parámetro min o max! \x1b[0m')
        return res.status(400).json({ mensaje: 'No se ingresó el parámetro min o max!'})
    }
    // Llamo al método find de la colección PRENDASENDB estableciendo
    // Uso expresiones regulares para buscar productos desde el minimo establecido hasta el maximo establecido
    PRENDASENDB.find({ precio: { $gte: min, $lte: max } })
    .then((prenda) => {
        // Si no se pudo acceder a las prendas con ese rango de precio, devuelvo un mensaje de error
        if(!prenda || prenda.length === 0){
            console.log('\x1b[31m No existe un producto con ese rango de precio! \x1b[0m')
            return res.status(404).json({ mensaje: 'No existe un producto con ese rango de precio!'})
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

        // -------------------------------------------------------------------------------

        // Muestro por consola los productos encontrados
        console.log(`\x1b[103m Productos encontrados -> \x1b[0m`)
        console.table(existePrenda)
        console.log('\x1b[103m -------------------------------------------------------------------- \x1b[0m')
        //---------------------------
        
        // Devuelvo los productos encontrados en la colección
        return res.status(200).json(prenda)
    })
    // Si no se pudo acceder a las prendas con ese rango de precio, devuelvo un mensaje de error
    .catch((ERROR) => {
        console.log('\x1b[31m No se pudo acceder a las prendas con ese rango de precio! -> \x1b[0m', ERROR)
        return res.status(500).json({ mensaje: 'No se pudo acceder a las prendas con ese rango de precio!', error: ERROR })
    })
}

////////////////////////////////////////////////////////////////////////////

// 9. Carga masiva de productos

exports.agregarProductosMasivos = (req, res) => {
  // Pregunto si el body es un array, si es un array se lo asigna a la constante prendas
  // Si no es un array, se lo convierte a un array y se asigna a la constante prendas
  const prendas = Array.isArray(req.body) ? req.body : [req.body]
  // Mapeo de los códigos de las prendas
  const codigos = prendas.map(p => p.codigo)
  // Llamo al método find de la colección PRENDASENDB
  PRENDASENDB.find({ codigo: { $in: codigos } })
    .then(prendasExistentes => {
        // Si no se pudo acceder a las prendas, devuelvo un mensaje de error
      if (prendasExistentes.length > 0) {
        const codigosExistentes = prendasExistentes.map(p => p.codigo)
        console.log('\x1b[33m Algunos códigos ya existen en la base de datos. \x1b[0m')
        return res.status(409).json({ mensaje: 'Algunos códigos ya existen', codigos: codigosExistentes })
      }
      // Llamo al método insertMany de la colección PRENDASENDB
      PRENDASENDB.insertMany(prendas)
        .then(prendasAgregadas => {
            // Muestro por consola los productos agregados
          console.log(`\x1b[102m Se agregaron ${prendasAgregadas.length} prendas a la base de datos \x1b[0m`)
          prendasAgregadas.forEach(p => console.table({ codigo: p.codigo, nombre: p.nombre, precio: p.precio }))
          // Devuelvo los productos agregados en la colección
          return res.status(201).json({ mensaje: 'Prendas agregadas exitosamente', prendas: prendasAgregadas })
        })
        // Si no se pudo agregar la prenda, devuelvo un mensaje de error
        .catch(error => {
          console.log('\x1b[31m Error al guardar las prendas: \x1b[0m', error)
          return res.status(500).json({ mensaje: 'Error al guardar las prendas', error })
        })
    })
    // Si no se pudo verificar los códigos existentes, devuelvo un mensaje de error
    .catch(error => {
      console.log('\x1b[31m Error al verificar duplicados: \x1b[0m', error);
      return res.status(500).json({ mensaje: 'Error al verificar códigos existentes', error })
    })

}

////////////////////////////////////////////////////////////////////////////////////////////

