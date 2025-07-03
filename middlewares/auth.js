const jwt = require('jsonwebtoken')
process.loadEnvFile()
const JWT = process.env.JWT_SECRET

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    console.log('\x1b[31m Token requerido para realizar este tipo de operación \x1b[0m')
    return res.status(401).json({ mensaje: 'Token requerido' })
  }

  jwt.verify(token, JWT, (err, user) => {
    if (err) { 
      console.log('\x1b[31m Token inválido \x1b[0m')
      return res.status(403).json({ mensaje: 'Token inválido' })
    }
    req.user = user
    next()
  })
}

module.exports = verificarToken