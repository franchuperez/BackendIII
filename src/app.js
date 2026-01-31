require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

// Importar routers
const mocksRouter = require('./routes/mocks.router');
const usersRouter = require('./routes/users.router');
const petsRouter = require('./routes/pets.router');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Mocking - Sistema de Usuarios y Mascotas',
    endpoints: {
      mocks: {
        'GET /api/mocks/mockingpets': 'Genera mascotas mock (migrado del primer desafío)',
        'GET /api/mocks/mockingusers': 'Genera 50 usuarios mock con formato MongoDB',
        'POST /api/mocks/generateData': 'Genera e inserta usuarios y mascotas en la BD (body: {users: number, pets: number})'
      },
      users: {
        'GET /api/users': 'Obtiene todos los usuarios',
        'GET /api/users/:id': 'Obtiene un usuario por ID',
        'POST /api/users': 'Crea un nuevo usuario'
      },
      pets: {
        'GET /api/pets': 'Obtiene todas las mascotas',
        'GET /api/pets/:id': 'Obtiene una mascota por ID',
        'POST /api/pets': 'Crea una nueva mascota'
      }
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Documentación disponible en http://localhost:${PORT}`);
});

module.exports = app;
