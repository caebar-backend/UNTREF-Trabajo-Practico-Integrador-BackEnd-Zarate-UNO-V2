## Carpeta utils

### Archivo `actualizarJWTSecret.js`
- Se utiliza los módulos `fs` y `path` para leer y escribir archivos.
- Se utiliza el módulo `crypto` para generar un nuevo JWT_SECRET.
- La función `generarNuevoJWTSecret` genera un nuevo JWT_SECRET.
- La función `actualizarJWTSecret` actualiza el JWT_SECRET en el archivo `.env`.
- Exporta la función `actualizarJWTSecret`.