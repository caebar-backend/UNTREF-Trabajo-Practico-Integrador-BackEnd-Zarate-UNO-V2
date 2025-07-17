## Carpeta raíz de la aplicación

#### Archivo `app.js`
- Se requiere el módulos y se importantan las funciones de diferentes carpetas para crear la el archivo base de la aplicación.
- Solicito el módulo `express` para crear la aplicación.
- Se requiere la función `connectDB` para conectar a la base de datos.
- Solicito el archivo `productRoutes.js` para crear las rutas de la aplicación.
- Se cargan datos de `.env` para obtener la configuración de la aplicación.
- Se require el archivo `userRoutes.js` para crear las rutas de login.
- Se requiere el archivo `errorController.js` para crear la ruta de error.
- Se requiere el archivo `actualizarJWTSecret.js` para actualizar el JWT_SECRET.
- Se usa el middleware `express.json()` para poder hacer peticiones en formato JSON.
- Se definen otros middlewares para definir el tramo inicial de las rutas a usar desde el archivo `api.http`.
- Se define la función `inicioServidor` que inicia el servidor.
- Se define la función `actualizarJWTSecret` que actualiza el JWT_SECRET en el archivo `.env`.
- Se define la función `inicioServidor` que inicia el servidor.

#### Archivo `api.http`
- Se definen las rutas de la aplicación.
- Se definen las rutas para el logueo de usuarios.
- Se definen las rutas para las acciones de la aplicación.
- Se definen datos para las pruebas y uso de la aplicación.

### Fichero `env(copy)`
- Se definen las constantes complementarias del entorno para la aplicación.

### Registro `.gitignore`
- Se definen los archivos y carpetas que no se deben incluir en el repositorio.