
## En la Carpeta `controllers` se definen las funciones que manejan las peticiones del usuario.

### Archivo `errorController.js`
- Exporta la función `rutaNoEncontradaInexistente` que maneja la respuesta cuando la ruta no existe.

### Fichero `productController.js`
- Exporta las funciones `todasLasPrendas`, `prendasPorCodigo`, `agregarProducto`, `modificarProducto`, `eliminarProducto`, `buscarProductoPorCoincidenciaEnNombre`, `filtrarProductoPorCategoria`, `busquedaPorRangoDePrecio` y `agregarProductosMasivos`. Estas funciones manejan las peticiones del usuario para la gestión de los productos.
- Se requiere el esquema de carpeta `models`, el esquema almacenado en el fichero `product.js`. 
- Importamos la constante `PRENDASENDB` para acceder a los datos de la colección `prendas` en la base de datos.

### Registro `userController.js`
- Exporta la función `login` que verifica si el usuario existe y si sus credenciales son correctas.
- Importamos la función `jwt.sign` de `jsonwebtoken` para generar el token JWT.
- Importamos el archivo de datos de usuarios `usersAutorizados.js` para acceder a los datos de los usuarios autorizados.
- Importamos el archivo de datos de usuarios `process.loadEnvFile()` para cargar los datos de la base de datos de MongoDB desde el archivo `.env`.
- Importamos el valor de la variable de entorno `JWT_SECRET` para obtener el JWT_SECRET de `.env`.