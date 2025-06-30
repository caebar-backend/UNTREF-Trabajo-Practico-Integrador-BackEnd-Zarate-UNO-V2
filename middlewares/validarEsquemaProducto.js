
const Ajv = require('ajv');
const ajv = new Ajv();

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
};

const validarEsquemaProducto = (req, res, next) => {
  const validar = ajv.compile(esquemaProducto)
  const datos = req.body
  let errores = []

  if (Array.isArray(datos)) {
    const validos = datos.map((item, index) => {
      const esValido = validar(item)
      if (!esValido) {
        errores.push({ index, errores: validar.errors })
      }
      return esValido
    });

    if (errores.length > 0) {
      return res.status(400).json({
        mensaje: 'Algunos productos no tienen el formato válido.',
        detalles: errores
      });
    }
  } else {
    const valido = validar(datos)
    if (!valido) {
      return res.status(400).json({
        mensaje: 'El formato del producto no es válido.',
        errores: validar.errors
      });
    }
  }

  next()
}

module.exports = { validarEsquemaProducto }