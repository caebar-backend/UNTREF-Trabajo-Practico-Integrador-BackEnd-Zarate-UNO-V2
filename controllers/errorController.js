

// Exporto la función rutaNoEncontradaInexistente (Endpoint que maneja la respuesta cuando la ruta no existe)
exports.rutaNoEncontradaInexistente = (req, res) => {
    const { url } = req
    res.status(404).json({
    mensaje: [' ------------------- ',' ------------------------- ','Ruta no encontrada o inexistente','Dirección inexistente en éste servidor!!',' ------------------- ',' ------------------------- ']
  })
  console.log('\x1b[101m Ruta no encontrada o inexistente... Dirección inexistente en éste servidor!! -> \x1b[0m', url)
}

