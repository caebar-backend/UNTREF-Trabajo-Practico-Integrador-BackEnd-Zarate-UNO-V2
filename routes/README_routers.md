## Carpeta `routes`
- Se almacenan las rutas de la aplicación, cuáles se utilizarán para complacer las acciones que ejecutará un usuario al acceder.

### Archivo `productRoutes.js`
- En este archivo se establecen módulos y se requieren funciones de diferentes carpetas, para crear los caminos a utilizarse en la aplicación.
- Se requiere el módulo `express` para crear las rutas.
- Se requiere las funciones diseñadas para establecer las rutas, que se encuentran en el archivo `productController.js`.
- Se requiere el middleware `validarEsquemaProducto` para validar el esquema de producto.
- Se requiere el middleware `auth` para verificar el token.
- Se define la constante `router` que almacena la instancia de `express.Router()`.
  
  ### Fichero `userRoutes.js`
  - En este archivo se establecen módulos y se requieren funciones para diseñar la ruta de login, así los usuarios con privilegios pueden acceder a la aplicación y ejecutar acciones sensibles.
  - Se requiere el módulo `express` para crear las rutas.
  - Se define la constante `router` que almacena la instancia de `express.Router()`.
  - Se importa `userController.js` de la carpeta `controllers` para acceder a la función `login`.