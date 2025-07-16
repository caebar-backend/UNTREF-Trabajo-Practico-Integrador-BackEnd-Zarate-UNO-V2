
// Requiero el módulo fs para leer y escribir archivos
const fs = require('fs')
// Requiero el módulo path para obtener la ruta del archivo .env
const path = require('path')
// Requiero el módulo crypto para generar un nuevo JWT_SECRET
const crypto = require('crypto')

// Función que genera un nuevo JWT_SECRET
function generarNuevoJWTSecret() {
  return crypto.randomBytes(32).toString('hex')
}

// Función que actualiza el JWT_SECRET en el archivo .env
function actualizarJWTSecret() {
  // Obtengo la ruta del archivo .env
  const envPath = path.join(__dirname, '../.env')
  // Verifico si el archivo .env existe, si no, devuelvo un mensaje de advertencia
  if (!fs.existsSync(envPath)) {
    console.warn('[⚠️] No se encontró el archivo .env en la raíz del proyecto')
    return
  }
  // Leo el contenido del archivo .env
  const contenido = fs.readFileSync(envPath, 'utf-8')
  // Asigno a la constante nuevoSecret el resultado de la función generarNuevoJWTSecret
  const nuevoSecret = generarNuevoJWTSecret()
  // Reemplazo el JWT_SECRET en el archivo .env por el nuevo JWT_SECRET
  const nuevoContenido = contenido.replace(
    /^JWT_SECRET=.*$/m,
    `JWT_SECRET=${nuevoSecret}`
  )
  // Escribo el nuevo contenido del archivo .env
  fs.writeFileSync(envPath, nuevoContenido)
  // Muestro por consola un mensaje
  console.log('\x1b[33m✅ Nuevo JWT_SECRET generado y actualizado en .env\x1b[0m')
}
// Exporto la función actualizarJWTSecret
module.exports = actualizarJWTSecret