
## Carpeta de `middlewares`
- Se almacenan las funciones que manejan ciertas peticiones del usuario, la cuales deben ser ejecutadas antes de que se ejecuten las funciones de la ruta.

### Fichero `auth.js`
- Exporta la función `verificarToken` que verifica el token generado por el servidor, y si es válido el usuario obtiene permisos para realizar ciertas operaciones.

### Archivero `validarEsquemaProducto.js`
- Exporta la función `validarEsquemaProducto` que valida el esquema de producto.
- Se requiere el módulo `ajv` para la validación de esquemas JSON.
- Se define la constante `esquemaProducto` que especifica el esquema de validación al postear productos de forma masiva usando POST.