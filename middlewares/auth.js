// Requiero el módulo de jsonwebtoken
const jwt = require('jsonwebtoken')
// Carga de datos desde .env
process.loadEnvFile()
const JWT = process.env.JWT_SECRET

// Función que verifica el token generado por el servidor
function verificarToken(req, res, next) {
  // Obtengo el token de la cabecera de la petición, se extrae el código que figura despues de la palabra 'Authorization'
  const authHeader = req.headers['authorization']
  // En esta parte se extrae el token de la cabecera de la petición y se lo guarda en un array [bearer, token]
  const token = authHeader && authHeader.split(' ')[1]
  // Si el token no existe, devuelvo un mensaje de error
  if (!token) {
    console.log('\x1b[31m Token requerido para realizar este tipo de operación \x1b[0m')
    return res.status(401).json({ mensaje: 'Token requerido' })
  }
    // Si el token existe, verifico si es válido
  jwt.verify(token, JWT, (err, user) => {
    // Si el token no es válido, devuelvo un mensaje de error
    if (err) { 
      console.log('\x1b[31m Token inválido \x1b[0m')
      return res.status(403).json({ mensaje: 'Token inválido' })
    }
    // Si el token es válido, guardo el usuario en la variable user
    req.user = user
    // Permiso para pasar a la siguiente paso en la ruta 
    next()
  })
}
// Exporto la función verificarToken
module.exports = verificarToken