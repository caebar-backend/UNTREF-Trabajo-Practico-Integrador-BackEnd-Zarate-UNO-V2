// Requiero el módulo de jsonwebtoken
const jwt = require('jsonwebtoken')
// Requiero el archivo de datos de usuariosAutorizados
const usuarios = require('../data/usersAutorizados')
// Cargo datos de .env
process.loadEnvFile()
// Obtengo el JWT_SECRET de .env
const JWT = process.env.JWT_SECRET

// Función que verifica si el usuario existe y si sus credenciales son correctas
const login = (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find((user) => {
    return user.email === email && user.password === password
  })
  // Si el usuario no existe o sus credenciales no son correctas, devuelvo un mensaje de error
  if (!usuario) {
    console.log('\x1b[31m Credenciales inválidas, verifique su correo electrónico y contraseña \x1b[0m')
    return res.status(401).json({ mensaje: 'Credenciales inválidas' })
  }
  // Si el usuario existe y sus credenciales son correctas, genero un token JWT
  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol || 'usuario' },
    JWT,
    { expiresIn: '1h' } // Token expira en 1 hora
  )
  // Muestro por consola y por respuesta JSON el token JWT generado
  console.log('\x1b[105m Token generado -> \x1b[0m', token)
  res.json({ mensaje: 'Login exitoso', token })
}
// Exporto la función login 
module.exports = { login }