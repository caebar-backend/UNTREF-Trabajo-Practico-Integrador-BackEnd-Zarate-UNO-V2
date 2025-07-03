const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

function generarNuevoJWTSecret() {
  return crypto.randomBytes(32).toString('hex')
}

function actualizarJWTSecret() {
  const envPath = path.join(__dirname, '../.env')

  if (!fs.existsSync(envPath)) {
    console.warn('[⚠️] No se encontró el archivo .env en la raíz del proyecto')
    return;
  }

  const contenido = fs.readFileSync(envPath, 'utf-8')
  const nuevoSecret = generarNuevoJWTSecret()

  const nuevoContenido = contenido.replace(
    /^JWT_SECRET=.*$/m,
    `JWT_SECRET=${nuevoSecret}`
  );

  fs.writeFileSync(envPath, nuevoContenido)
  console.log('\x1b[33m✅ Nuevo JWT_SECRET generado y actualizado en .env\x1b[0m')
}

module.exports = actualizarJWTSecret