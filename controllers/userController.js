const jwt = require('jsonwebtoken')
const usuarios = require('../data/usersAutorizados')
process.loadEnvFile()
const JWT = process.env.JWT_SECRET

const login = (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find((user) => {
    return user.email === email && user.password === password
  })

  if (!usuario) {
    console.log('\x1b[31m Credenciales inválidas, verifique su correo electrónico y contraseña \x1b[0m')
    return res.status(401).json({ mensaje: 'Credenciales inválidas' })
  }

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol || 'usuario' },
    JWT,
    { expiresIn: '1h' }
  )
  console.log('\x1b[105m Token generado -> \x1b[0m', token)
  res.json({ mensaje: 'Login exitoso', token })
};

module.exports = { login }