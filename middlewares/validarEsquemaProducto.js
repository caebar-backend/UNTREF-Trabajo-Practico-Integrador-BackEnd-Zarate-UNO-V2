
// Solicito módulo del validador de esquemas JSON
const Ajv = require('ajv')
// En las constante ajv se especifica una nueva instancia del módulo Ajv
const ajv = new Ajv()

// Definir esquema de validación para los productos
const esquemaProducto = {
  type: 'object',
  properties: {
    codigo: { type: 'number' },
    nombre: { type: 'string' },
    precio: { type: 'number' },
    categoria: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: ['codigo', 'nombre', 'precio', 'categoria'],
  additionalProperties: false
}

// Función que valida el esquema de producto
const validarEsquemaProducto = (req, res, next) => {
  // En la constante validar se especifica la función que validará el esquema de producto
  const validar = ajv.compile(esquemaProducto)
  // Obtengo los datos del producto del body de la petición
  const datos = req.body
  // Array que almacena los errores de validación
  let errores = []
  // Si la constante datos es un array, se valida cada elemento del array
  if (Array.isArray(datos)) {
    // Se guardan los datos del mapeo de la constante datos en la constante validos, para luego mostrarlos en consola
    const validos = datos.map((item, index) => {
      // Validamos el producto con el esquema de validación
      const esValido = validar(item)
      // Si el producto no es válido, se agregan los errores a la constante errores
      if (!esValido) {
        errores.push({ index, errores: validar.errors })
      }
      // Devuelvo el resultado del producto validado para la constante validos, desde la informacion almacenada en la constante esValido
      return esValido
    })
    // Muestro por consola los datos del mapeo de la constante validos
    console.log('\x1b[102m Console Log desde el MIDDLEWARE -> validarEsquemaProducto \x1b[0m')
    console.table(validos)
    // Si hay errores en la validación, devuelvo un mensaje de error
    if (errores.length > 0) {
      return res.status(400).json({
        mensaje: 'Algunos productos no tienen el formato válido.',
        detalles: errores
      })
    }
  } else {
    // Validamos el producto con el esquema de validación
    const valido = validar(datos)
    // Si el producto no es válido, devuelvo un mensaje de error
    if (!valido) {
      return res.status(400).json({
        mensaje: 'El formato del producto no es válido.',
        errores: validar.errors
      })
    }
  }
  // Si todo ha ido bien, pasamos a la siguiente instancia de la ruta
  next()
}
// Exporto la función validarEsquemaProducto
module.exports = { validarEsquemaProducto }