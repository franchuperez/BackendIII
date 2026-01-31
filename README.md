# Sistema de Mocking - Usuarios y Mascotas

Sistema completo de generación de datos mock para usuarios y mascotas con persistencia en MongoDB.

## 📋 Características Implementadas

### ✅ Entrega N°1 - Completada

- **Router Mocks** (`mocks.router.js`) funcionando bajo la ruta base `/api/mocks`
- **Endpoint migrado** `/mockingpets` del primer desafío
- **Módulo de Mocking** (`src/utils/mocking.js`) para generar usuarios y mascotas
- **Generación de Usuarios** con:
  - Contraseña "coder123" encriptada con bcrypt
  - Role aleatorio entre "user" y "admin"
  - Array de pets vacío
- **Endpoint GET** `/mockingusers` que genera 50 usuarios con formato MongoDB
- **Endpoint POST** `/generateData` que recibe parámetros numéricos `users` y `pets`
- **Verificación** mediante servicios GET de `/api/users` y `/api/pets`

## 🚀 Instalación

### Prerrequisitos

- Node.js v16 o superior
- MongoDB instalado y corriendo localmente
- npm o yarn

### Pasos

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Editar `.env` si es necesario:
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/adoptme
NODE_ENV=development
```

3. **Iniciar MongoDB:**
```bash
# En sistemas Unix/Mac
mongod

# O si usas MongoDB como servicio
sudo service mongod start
```

4. **Iniciar el servidor:**
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:8080`

## 📚 Endpoints Disponibles

### Mocks Endpoints

#### 1. GET /api/mocks/mockingpets
Genera mascotas mock sin insertarlas en la base de datos (endpoint migrado).

**Parámetros opcionales:**
- `count` (query): Número de mascotas a generar (default: 50)

**Ejemplo:**
```bash
curl http://localhost:8080/api/mocks/mockingpets?count=100
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "100 mascotas mock generadas",
  "data": [...]
}
```

#### 2. GET /api/mocks/mockingusers
Genera usuarios mock con formato MongoDB (50 por defecto).

**Características de los usuarios generados:**
- Contraseña encriptada: "coder123"
- Role: "user" o "admin" (aleatorio)
- Pets: array vacío

**Parámetros opcionales:**
- `count` (query): Número de usuarios a generar (default: 50)

**Ejemplo:**
```bash
curl http://localhost:8080/api/mocks/mockingusers
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "50 usuarios mock generados",
  "data": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "password": "$2b$10$...",
      "role": "user",
      "pets": []
    }
  ]
}
```

#### 3. POST /api/mocks/generateData
Genera e inserta usuarios y mascotas en la base de datos.

**Body (JSON):**
```json
{
  "users": 10,
  "pets": 20
}
```

**Ejemplo:**
```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 20}'
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Datos generados e insertados correctamente",
  "data": {
    "summary": {
      "usersInserted": 10,
      "petsInserted": 20
    },
    "users": [...],
    "pets": [...]
  }
}
```

### Endpoints de Verificación

#### GET /api/users
Obtiene todos los usuarios insertados en la base de datos.

```bash
curl http://localhost:8080/api/users
```

#### GET /api/pets
Obtiene todas las mascotas insertadas en la base de datos.

```bash
curl http://localhost:8080/api/pets
```

## 🧪 Pruebas Paso a Paso

### 1. Verificar que el servidor está corriendo
```bash
curl http://localhost:8080
```

### 2. Generar usuarios mock (sin insertar)
```bash
curl http://localhost:8080/api/mocks/mockingusers
```

### 3. Generar mascotas mock (sin insertar)
```bash
curl http://localhost:8080/api/mocks/mockingpets
```

### 4. Insertar datos en la base de datos
```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 50, "pets": 100}'
```

### 5. Verificar usuarios insertados
```bash
curl http://localhost:8080/api/users
```

### 6. Verificar mascotas insertadas
```bash
curl http://localhost:8080/api/pets
```

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── models/
│   │   ├── User.js              # Modelo de Usuario
│   │   └── Pet.js               # Modelo de Mascota
│   ├── routes/
│   │   ├── mocks.router.js      # Router de mocks (PRINCIPAL)
│   │   ├── users.router.js      # Router de usuarios
│   │   └── pets.router.js       # Router de mascotas
│   ├── services/
│   │   ├── user.service.js      # Servicio de usuarios
│   │   └── pet.service.js       # Servicio de mascotas
│   ├── utils/
│   │   └── mocking.js           # Módulo de generación de datos mock
│   └── app.js                   # Aplicación principal
├── .env.example                 # Ejemplo de variables de entorno
├── package.json
└── README.md
```

## 🔧 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **bcrypt** - Encriptación de contraseñas
- **@faker-js/faker** - Generación de datos mock
- **dotenv** - Gestión de variables de entorno

## 📝 Notas Importantes

1. **Contraseña encriptada**: Todos los usuarios mock tienen la contraseña "coder123" encriptada con bcrypt (10 rounds)
2. **Roles**: Se asignan aleatoriamente entre "user" y "admin"
3. **Formato MongoDB**: Los datos generados siguen el formato estándar de Mongoose/MongoDB
4. **Validación**: El endpoint POST valida que los parámetros sean números positivos
5. **Escalabilidad**: El módulo de mocking puede generar cualquier cantidad de registros

## ✅ Criterios de Evaluación Cumplidos

- [x] Creación del Router Mocks bajo `/api/mocks`
- [x] Migración del endpoint `/mockingpets`
- [x] Módulo de Mocking con características especificadas
- [x] Endpoint GET `/mockingusers` generando 50 usuarios
- [x] Endpoint POST `/generateData` con parámetros numéricos
- [x] Inserción correcta en base de datos
- [x] Verificación mediante servicios GET

## 🐛 Troubleshooting

**Error: MongoDB no conecta**
- Verificar que MongoDB esté corriendo: `sudo service mongod status`
- Revisar la URI en el archivo `.env`

**Error: Puerto en uso**
- Cambiar el puerto en `.env` o detener el proceso que usa el puerto 8080

**Error: Módulos no encontrados**
- Ejecutar `npm install` nuevamente

## 👨‍💻 Autor

Proyecto desarrollado para CoderHouse - Backend
