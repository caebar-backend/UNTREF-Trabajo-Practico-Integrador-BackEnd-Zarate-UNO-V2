// Array de objetos que contienen los datos de los usuarios autorizados
// Datos que son credenciales de acceso a la aplicación
const usersAutorizados = [
    {
        id: 1,
        nombre: 'Fabio',
        apellido: 'Drizzt',
        email: 'fabiodrizztUNTREF@gmail.com',
        password: '12345678',
        rol: 'admin'
    },
    {
        id: 2,
        nombre: 'Juan',
        apellido: 'Nebbia',
        email: 'juannebbiaUNTREF@gmail.com',
        password: '12345678',
        rol: 'admin'
    },
    {
        id: 3,
        nombre: 'Cristian',
        apellido: 'Budano',
        email: 'caebar@gmail.com',
        password: '12345678',
        rol: 'admin'
    },
    {
        id: 4,
        nombre: 'Invitado X',
        apellido: 'Desconocido X',
        email: 'invitadoxxx@gmail.com',
        password: '12345678',
        rol: 'VIP'
    }
]
// Exporto el array de objetos de usuariosAutorizados
module.exports = usersAutorizados