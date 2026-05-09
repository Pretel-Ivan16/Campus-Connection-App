# 🎓 CampusConnect Backend

Backend completo para una aplicación tipo foro universitario donde usuarios pueden registrarse, verificar su email y publicar posts dentro de distintas facultades.

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura](#arquitectura)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Progreso del Desarrollo](#progreso-del-desarrollo)
7. [Problemas Encontrados y Soluciones](#problemas-encontrados-y-soluciones)
8. [Endpoints](#endpoints)
9. [Modelos de Datos](#modelos-de-datos)
10. [Autenticación](#autenticación)
11. [Próximos Pasos](#próximos-pasos)

---

## 📌 Descripción General

**CampusConnect** es una plataforma de foro universitario que permite:

- ✅ Registro de usuarios universitarios
- ✅ Verificación de email
- ✅ Autenticación con JWT
- ✅ Visualización de facultades
- ✅ Creación de posts dentro de facultades
- ✅ Edición y eliminación de posts (solo por el autor)
- ✅ Relaciones entre usuarios, facultades y posts

### Objetivo Principal

Crear un **backend profesional y escalable** que pueda conectar con un frontend React, usando **arquitectura en capas** y **buenas prácticas** de desarrollo.

---

## 🛠️ Stack Tecnológico

### Backend

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Autenticación y Seguridad

- **JWT (jsonwebtoken)** - Tokens de autenticación
- **bcrypt** - Hash seguro de contraseñas
- **dotenv** - Gestión de variables de entorno

### Email

- **Nodemailer** - Envío de correos electrónicos

### Otros

- **CORS** - Control de acceso entre orígenes
- **Nodemon** - Reinicio automático en desarrollo

---

## 🏗️ Arquitectura

Se implementa una **arquitectura en capas profesional** que separa responsabilidades:

```
REQUEST
  ↓
ROUTES (Definición de endpoints)
  ↓
CONTROLLERS (Manejo de req/res)
  ↓
SERVICES (Lógica de negocio)
  ↓
REPOSITORIES (Acceso a datos)
  ↓
MODELS & DATABASE (MongoDB)
```

### Responsabilidades por Capa

| Capa             | Responsabilidad                                            |
| ---------------- | ---------------------------------------------------------- |
| **Routes**       | Definir endpoints y vincular con controladores             |
| **Controllers**  | Recibir request, validar, llamar servicio, enviar response |
| **Services**     | Lógica de negocio compleja                                 |
| **Repositories** | Único acceso a la base de datos                            |
| **Models**       | Schemas de Mongoose                                        |
| **Config**       | Configuración de variables de entorno                      |
| **Middlewares**  | Validación, autenticación, manejo de errores               |
| **Utils**        | Funciones reutilizables (hash, JWT, email)                 |

---

## 📁 Estructura del Proyecto

```
campus-connecion-app/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── environment.config.js      # Carga de variables .env
│   │   │   ├── mailer.config.js           # Configuración de Nodemailer
│   │   │   └── mongoDB.config.js          # Conexión a MongoDB
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js         # Controlador de autenticación
│   │   │   ├── faculty.controller.js      # Controlador de facultades
│   │   │   ├── post.controller.js         # Controlador de posts
│   │   │   └── health.controller.js       # Controlador de health check
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js         # Validación de JWT
│   │   │   ├── error.middleware.js        # Manejo centralizado de errores
│   │   │   └── validate.middleware.js     # Validación de inputs
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js              # Schema de Usuario
│   │   │   ├── faculty.model.js           # Schema de Facultad
│   │   │   └── post.model.js              # Schema de Post
│   │   │
│   │   ├── repositories/
│   │   │   ├── user.repository.js         # Acceso a datos de usuarios
│   │   │   ├── faculty.repository.js      # Acceso a datos de facultades
│   │   │   └── post.repository.js         # Acceso a datos de posts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js             # Rutas de autenticación
│   │   │   ├── faculty.routes.js          # Rutas de facultades
│   │   │   ├── post.routes.js             # Rutas de posts
│   │   │   └── health.routes.js           # Rutas de health check
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js            # Lógica de autenticación
│   │   │   ├── faculty.service.js         # Lógica de facultades
│   │   │   └── post.service.js            # Lógica de posts
│   │   │
│   │   ├── utils/
│   │   │   ├── email.js                   # Funciones de envío de email
│   │   │   ├── hash.js                    # Hash y verificación de contraseñas
│   │   │   ├── jwt.js                     # Generación y validación de JWT
│   │   │   └── generateToken.js           # Generación de tokens
│   │   │
│   │   ├── app.js                          # Configuración de Express
│   │   └── server.js                       # Punto de entrada
│   │
│   ├── .env                                # Variables de entorno (LOCAL)
│   ├── .env.example                        # Plantilla de variables de entorno
│   ├── package.json                        # Dependencias del proyecto
│   ├── README.md                           # Este archivo
│   └── .gitignore                          # Archivos ignorados por git
```

---

## 🚀 Instalación y Configuración

### Prerequisitos

- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB (cloud o local)

### Pasos de Instalación

#### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd campus-connecion-app/Backend
```

#### 2. Instalar Dependencias

```bash
npm install
```

#### 3. Configurar Variables de Entorno

Copiar `.env.example` a `.env` y actualizar con valores reales:

```bash
cp .env.example .env
```

**Contenido de .env:**

```
PORT=8080
MONGODB_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-db
JWT_SECRET=tu_clave_secreta_super_larga_y_segura
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_aplicacion_gmail
```

> ⚠️ **IMPORTANTE:** Nunca commitear `.env` con datos sensibles. Usar `.env.example` como referencia.

#### 4. Iniciar el Servidor

**Modo Desarrollo (con Nodemon):**

```bash
npm run dev
```

**Modo Producción:**

```bash
npm start
```

#### 5. Verificar que Funciona

```bash
curl http://localhost:8080/health
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "API working"
}
```

---

## 📊 Progreso del Desarrollo

### ✅ Fase 1: Configuración Base (COMPLETADA)

**Objetivos Alcanzados:**

- ✅ Estructura de carpetas creada
- ✅ Configuración de variables de entorno
- ✅ Conexión a MongoDB con Mongoose
- ✅ Instancia de Express con CORS
- ✅ Endpoint `/health` funcionando
- ✅ ES Modules configurados
- ✅ Nodemon para desarrollo

**Archivos Creados:**

| Archivo                 | Propósito                             |
| ----------------------- | ------------------------------------- |
| `environment.config.js` | Carga variables .env con dotenv       |
| `mongoDB.config.js`     | Conecta MongoDB usando Mongoose       |
| `app.js`                | Configura Express, CORS, JSON parsing |
| `server.js`             | Levanta servidor y conecta BD         |
| `health.controller.js`  | Controlador del endpoint /health      |
| `health.routes.js`      | Rutas para health check               |
| `.env.example`          | Plantilla de variables de entorno     |

**Estado Actual:**

```
🚀 Servidor corriendo en puerto 8080
✅ MongoDB conectado exitosamente
✅ GET /health responde correctamente
```

**Output del Servidor:**

```
◇ injected env (5) from .env
✅ MongoDB connected successfully
🚀 Server running on port 8080
```

---

### ✅ Fase 2: Modelos de Datos (EN PROGRESO)

**Objetivos:**

- [x] Crear modelo User con email, password, isVerified, verificationToken
- [x] Crear modelo Faculty con name, description
- [x] Crear modelo Post con title, content, authorId, facultyId
- [x] Establecer relaciones entre modelos
- [x] Crear indexes en campos únicos

**Archivos Creados:**

| Archivo            | Descripción                             |
| ------------------ | --------------------------------------- |
| `user.model.js`    | Schema de Usuario con validaciones      |
| `faculty.model.js` | Schema de Facultad con índice único     |
| `post.model.js`    | Schema de Post con relaciones y índices |

**Detalles del Modelo User:**

El modelo User incluye:

- ✅ Email con validación de formato y unique index
- ✅ Password (no incluido por defecto en queries)
- ✅ isVerified para verificación de email
- ✅ verificationToken (no incluido por defecto en queries)
- ✅ Timestamps automáticos (createdAt, updatedAt)
- ✅ Índice en email para búsquedas rápidas
- ✅ Mensajes de error personalizados

**Detalles del Modelo Faculty:**

El modelo Faculty incluye:

- ✅ Name con unique index y minlength: 3
- ✅ Description opcional
- ✅ Timestamps automáticos (createdAt, updatedAt)
- ✅ Índice en name para búsquedas rápidas
- ✅ Mensajes de error personalizados
- ✅ Trim automático en campos texto

**Detalles del Modelo Post:**

El modelo Post incluye:

- ✅ Title con minlength: 3
- ✅ Content con minlength: 10
- ✅ AuthorId referenciando User con relación obligatoria
- ✅ FacultyId referenciando Faculty con relación obligatoria
- ✅ Timestamps automáticos (createdAt, updatedAt)
- ✅ Índices en authorId, facultyId y createdAt para búsquedas rápidas
- ✅ Trim automático en campos texto
- ✅ Mensajes de error personalizados
- ✅ Listo para populate() de relaciones

**Estado Actual:**

```
✅ Modelo User creado y listo
✅ Modelo Faculty creado y listo
✅ Modelo Post creado y listo
```

---

---

### ✅ Fase 3: Autenticación (COMPLETADA 100%)

**Objetivos:**

- [x] Crear utilidades de hash (bcrypt)
- [x] Crear utilidades de JWT
- [x] Crear utilidades de email
- [x] Crear servicio de autenticación
- [x] Implementar POST /auth/register
- [x] Implementar GET /auth/verify-email/:token
- [x] Implementar POST /auth/login
- [x] Crear middleware de autenticación

**Archivos Creados:**

| Archivo              | Descripción                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `hash.js`            | Utilidades de hash con bcrypt (hashPassword, comparePassword)                     |
| `jwt.js`             | Utilidades de JWT (generateToken, verifyToken, generateVerificationToken)         |
| `email.js`           | Utilidades de email con nodemailer (sendVerificationEmail, sendEmail)             |
| `auth.service.js`    | Servicio de autenticación (registerUser, loginUser, verifyUserEmail)              |
| `auth.controller.js` | Controladores de endpoints (register, verifyEmail, login, getProfile)             |
| `auth.routes.js`     | Rutas de autenticación (POST register, GET verify-email, POST login, GET profile) |
| `auth.middleware.js` | Middleware JWT para proteger rutas (authMiddleware, optionalAuthMiddleware)       |

**Detalles de hash.js:**

El archivo incluye:

- ✅ `hashPassword(password)` - Genera hash con salt rounds = 10
- ✅ `comparePassword(password, hashedPassword)` - Compara contraseña plana con hash
- ✅ Validación de inputs
- ✅ Manejo completo de errores
- ✅ Async/await
- ✅ JSDoc con documentación clara
- ✅ Mensajes de error descriptivos

**Estado Actual:**

**Detalles de jwt.js:**

El archivo incluye:

- ✅ `generateToken(payload, expiresIn)` - Genera JWT con expiración personalizada (default: 24h)
- ✅ `verifyToken(token)` - Verifica y decodifica JWT
- ✅ `generateVerificationToken(userId)` - Genera token de verificación de email
- ✅ Soporte para "Bearer " en tokens
- ✅ Manejo de errores específicos (TokenExpiredError, JsonWebTokenError)
- ✅ Validación de JWT_SECRET en config
- ✅ JSDoc con documentación clara
- ✅ Manejo completo de excepciones

**Detalles de auth.service.js:**

El archivo incluye:

- ✅ `registerUser(email, password, frontendUrl)` - Registra nuevo usuario con hash de contraseña
- ✅ `verifyUserEmail(token)` - Verifica email usando token JWT
- ✅ `loginUser(email, password)` - Autentica usuario y genera token JWT
- ✅ `getUserById(userId)` - Obtiene datos del usuario por ID
- ✅ `getUserByEmail(email)` - Obtiene datos del usuario por email
- ✅ Integración con User model
- ✅ Integración con utilidades (hash, JWT, email)
- ✅ Validación completa de inputs
- ✅ Manejo de errores descriptivos
- ✅ JSDoc con documentación clara

**Estado Actual:**

```
✅ Utilidades de hash completadas y listas
✅ Utilidades de JWT completadas y listas
✅ Utilidades de email completadas y listas
✅ Servicios de autenticación completados y listos
✅ Controladores de autenticación completados y listos
✅ Rutas de autenticación registradas y listas
✅ Middleware de autenticación implementado y listo
```

---

## 📚 Rutas de Autenticación

### auth.routes.js ✅

**Descripción:**

Define todos los endpoints de autenticación. Las rutas están registradas bajo el prefijo `/auth` en `app.js`.

**Endpoints:**

#### `POST /auth/register`

Registra un nuevo usuario con verificación de email.

**Body (JSON):**

```javascript
{
  email: "user@example.com",          // string, requerido
  password: "securePassword123",      // string, requerido (mín 6 caracteres)
  frontendUrl: "http://localhost:3000" // string, opcional
}
```

**Response 201 (Éxito):**

```javascript
{
  success: true,
  data: {
    userId: "507f1f77bcf86cd799439011",
    email: "user@example.com",
    isVerified: false
  },
  message: "User registered successfully. Check your email to verify."
}
```

**Response 400 (Email/password missing):**

```javascript
{
  success: false,
  message: "Email and password are required"
}
```

**Response 409 (Email duplicado):**

```javascript
{
  success: false,
  message: "This email is already registered"
}
```

**Validaciones:**

- ✅ Email y password requeridos
- ✅ Email debe ser válido (regex)
- ✅ Password mínimo 6 caracteres
- ✅ Email debe ser único

**Flujo:**

1. Validar inputs
2. Verificar que email no exista
3. Hashear contraseña con bcrypt
4. Crear usuario con `isVerified: false`
5. Generar token de verificación
6. Enviar email con link de verificación
7. Retornar datos del usuario (sin password)

---

#### `GET /auth/verify-email/:token`

Verifica el email del usuario usando el token de verificación.

**Parámetros URL:**

- `token` - Token JWT de verificación (válido por 24 horas)

**Ejemplo:**

```
GET /auth/verify-email/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response 200 (Éxito):**

```javascript
{
  success: true,
  data: {
    userId: "507f1f77bcf86cd799439011",
    email: "user@example.com",
    isVerified: true
  },
  message: "Email verified successfully. You can now login."
}
```

**Response 400 (Token missing):**

```javascript
{
  success: false,
  message: "Verification token is required"
}
```

**Response 401 (Token inválido o expirado):**

```javascript
{
  success: false,
  message: "Invalid or expired verification token"
}
```

**Flujo:**

1. Validar que token existe
2. Decodificar y verificar JWT
3. Buscar usuario con ese token de verificación
4. Marcar como `isVerified: true`
5. Eliminar token de verificación
6. Guardar cambios
7. Retornar datos del usuario

---

#### `POST /auth/login`

Autentica un usuario y devuelve JWT de acceso.

**Body (JSON):**

```javascript
{
  email: "user@example.com",
  password: "securePassword123"
}
```

**Response 200 (Éxito):**

```javascript
{
  success: true,
  data: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    userId: "507f1f77bcf86cd799439011",
    email: "user@example.com"
  },
  message: "Login successful"
}
```

**Response 400 (Missing inputs):**

```javascript
{
  success: false,
  message: "Email and password are required"
}
```

**Response 401 (Invalid credentials):**

```javascript
{
  success: false,
  message: "Invalid email or password"
}
```

**Response 403 (Email not verified):**

```javascript
{
  success: false,
  message: "Please verify your email before logging in"
}
```

**Flujo:**

1. Validar email y password
2. Buscar usuario por email (incluir password)
3. Comparar contraseña con bcrypt
4. Verificar que `isVerified: true`
5. Generar JWT con userId y email
6. Retornar token con expiración 24h

---

#### `GET /auth/profile` ⚠️

Obtiene los datos del usuario autenticado.

**⚠️ REQUIERE AUTENTICACIÓN**

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response 200 (Éxito):**

```javascript
{
  success: true,
  data: {
    userId: "507f1f77bcf86cd799439011",
    email: "user@example.com",
    isVerified: true,
    createdAt: "2026-05-07T10:30:00.000Z"
  },
  message: "Profile retrieved successfully"
}
```

**Response 401 (Not authenticated):**

```javascript
{
  success: false,
  message: "Authorization header is missing"
}
```

**Response 401 (Invalid token):**

```javascript
{
  success: false,
  message: "Invalid token"
}
```

**Flujo:**

1. Middleware extrae y valida JWT
2. Agrega datos del usuario a `req.user`
3. Controlador busca usuario por ID
4. Retorna datos del usuario

---

## 🔐 Middleware de Autenticación

### auth.middleware.js ✅

**Descripción:**

Middleware para validar JWT y proteger rutas que requieren autenticación.

**Funciones exportadas:**

#### `authMiddleware`

Middleware que requiere autenticación JWT. Bloquea la petición si no hay token válido.

**Uso en rutas:**

```javascript
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Proteger una ruta
router.post("/posts", authMiddleware, createPost);
```

**Headers esperados:**

```
Authorization: Bearer <token>
```

**Proceso:**

1. Lee header `Authorization`
2. Valida formato `Bearer <token>`
3. Extrae token
4. Verifica y decodifica JWT
5. Agrega `req.user` con userId, email, iat, exp
6. Continúa al siguiente middleware/controlador

**Si hay error:**

- Sin Authorization header → 401 "Authorization header is missing"
- Formato incorrecto → 401 "Invalid authorization header format"
- Token expirado → 401 "Token has expired"
- Token inválido → 401 "Invalid token"

**Ejemplo de req.user después del middleware:**

```javascript
req.user = {
  userId: "507f1f77bcf86cd799439011",
  email: "user@example.com",
  iat: 1715068200,
  exp: 1715154600,
};
```

---

#### `optionalAuthMiddleware`

Middleware que intenta autenticar pero NO bloquea si falla. Útil para endpoints que funcionan tanto para usuarios autenticados como anónimos.

**Uso en rutas:**

```javascript
// Endpoint que funciona con o sin autenticación
router.get("/posts", optionalAuthMiddleware, getPosts);

// En el controlador:
if (req.user) {
  // Usuario autenticado
} else {
  // Usuario anónimo
}
```

**Diferencia con authMiddleware:**

- `authMiddleware` → Requiere token válido (bloquea sin él)
- `optionalAuthMiddleware` → Token opcional (continúa aunque falle)

**Proceso:**

1. Intenta leer y validar JWT
2. Si hay token válido → agrega `req.user`
3. Si no hay token o es inválido → continúa sin autenticación
4. Siempre continúa al siguiente middleware/controlador

---

#### `requireRole(role)` ⚠️

**Estado:** Función reservada para futuro (actualmente no implementada)

Cuando los usuarios tengan roles (admin, moderator, etc.), este middleware validará que tengan permiso.

```javascript
// Ejemplo para futuro:
router.delete("/posts/:id", authMiddleware, requireRole("admin"), deletePost);
```

---

**Estado Actual:**

````
✅ authMiddleware implementado y listo
✅ optionalAuthMiddleware implementado y listo
⏳ requireRole (reservado para futuro)

---

### ✅ Fase 4: Repositorios (COMPLETADA - Refactorizada con BaseRepository)

**Objetivos Alcanzados:**

- [x] Crear repositorio de usuarios
- [x] Crear repositorio de facultades
- [x] Crear repositorio de posts
- [x] Refactorizar con patrón BaseRepository para reutilización de código

**Archivos Creados/Refactorizados:**

| Archivo                  | Descripción                                        | Estado             |
| ------------------------ | -------------------------------------------------- | ------------------ |
| `base.repository.js`     | Clase base con lógica CRUD reutilizable (156 líneas) | ✅ NUEVO |
| `user.repository.js`     | Extiende BaseRepository (130 líneas, -60% código) | ✅ REFACTORIZADO |
| `faculty.repository.js`  | Extiende BaseRepository (138 líneas, -60% código) | ✅ REFACTORIZADO |
| `post.repository.js`     | Extiende BaseRepository (140 líneas, -70% código) | ✅ REFACTORIZADO |

**Arquitectura: BaseRepository Pattern**

Se implementó una clase `BaseRepository` que proporciona métodos genéricos reutilizables:

```javascript
// Métodos disponibles en BaseRepository:
- findById(id, options)        // Buscar por ID
- findOne(query, options)      // Buscar uno
- findAll(options)             // Obtener todos
- create(data)                 // Crear documento
- update(id, data, options)    // Actualizar
- delete(id)                   // Eliminar
- exists(query)                // Verificar existencia
- count(query)                 // Contar documentos
````

**Beneficios de la Refactorización:**

✅ Reducción de código duplicado (~60%)
✅ Mantenimiento más fácil (cambios en un lugar)
✅ Nuevos repositorios creados más rápido
✅ Consistencia en manejo de errores
✅ Compatible con código existente (funciones exportadas)
✅ Patrón OOP y singleton pattern

**Detalles de BaseRepository (src/repositories/base.repository.js):**

```javascript
export class BaseRepository {
  constructor(model) {
    this.Model = model;
  }

  // Métodos genéricos con manejo de errores integrado
  async findById(id, options = {})
  async findOne(query, options = {})
  async findAll(options = {})
  async create(data)
  async update(id, data, options = {})
  async delete(id)
  async exists(query)
  async count(query = {})
}
```

**Detalles de user.repository.js (REFACTORIZADO):**

El archivo ahora extiende BaseRepository y mantiene todos los métodos:

- ✅ `createUser(userData)` - Crear usuario con validaciones
- ✅ `getUserById(userId)` - Obtener usuario por ID
- ✅ `getUserByEmail(email)` - Obtener usuario por email (sin password)
- ✅ `getAllUsers()` - Obtener todos los usuarios
- ✅ `updateUser(userId, updateData)` - Actualizar usuario
- ✅ `deleteUser(userId)` - Eliminar usuario
- ✅ `getUserWithPassword(email)` - Obtener usuario con password
- ✅ `emailExists(email)` - Verificar si email existe

**Características:**

- Excluye password y token por defecto
- Normaliza emails (lowercase, trim)
- Conversión a objeto con `.toObject()`
- Manejo completo de errores
- Exporta clase + funciones + singleton

**Detalles de faculty.repository.js (REFACTORIZADO):**

El archivo ahora extiende BaseRepository:

- ✅ `createFaculty(facultyData)` - Crear facultad
- ✅ `getFacultyById(facultyId)` - Obtener por ID
- ✅ `getFacultyByName(name)` - Obtener por nombre
- ✅ `getAllFaculties()` - Obtener todas las facultades
- ✅ `updateFaculty(facultyId, updateData)` - Actualizar facultad
- ✅ `deleteFaculty(facultyId)` - Eliminar facultad
- ✅ `facultyNameExists(name)` - Verificar si nombre existe
- ✅ `getFacultyCount()` - Contar total de facultades

**Características:**

- Trim automático en campos texto
- Validaciones completas
- Permite actualizar nombre y descripción
- Código reducido en ~60%

**Detalles de post.repository.js (REFACTORIZADO):**

El archivo ahora extiende BaseRepository con populate especializado:

- ✅ `createPost(postData)` - Crear post con populate
- ✅ `getAllPosts()` - Obtener todos los posts con populate
- ✅ `getPostById(postId)` - Obtener post por ID con populate
- ✅ `updatePost(postId, updateData)` - Actualizar post con populate
- ✅ `deletePost(postId)` - Eliminar post
- ✅ `getPostsByAuthor(authorId)` - Posts de un autor
- ✅ `getPostsByFaculty(facultyId)` - Posts de una facultad

**Características Especiales:**

- Populate constante: `POPULATE_OPTIONS = [{ path: 'authorId', ... }, { path: 'facultyId', ... }]`
- Ordenamiento automático por fecha descendente
- Relaciones automáticamente pobladas
- Reducción del código en ~70%
- Manejo de errores integrado

**Estado Actual:**

```

✅ BaseRepository creado (156 líneas, 10 métodos genéricos)
✅ User.repository refactorizado (130 líneas, -60% código)
✅ Faculty.repository refactorizado (138 líneas, -60% código)
✅ Post.repository refactorizado (140 líneas, -70% código)
✅ Acceso a datos centralizado y reutilizable
✅ Backward compatible (funciones exportadas)

```

---

### ✅ Fase 5: Servicios (COMPLETADA)

**Objetivos Alcanzados:**

- [x] Crear servicio de posts
- [x] Crear servicio de facultades
- [x] Implementar lógica de negocio para posts
- [x] Implementar lógica de negocio para facultades
- [x] Validaciones completas
- [x] Control de ownership en posts

**Archivos Creados:**

| Archivo              | Descripción                                | Líneas |
| -------------------- | ------------------------------------------ | ------ |
| `post.service.js`    | Servicios para posts con lógica de negocio | 320+   |
| `faculty.service.js` | Servicios para facultades con validaciones | 260+   |

**Detalles de post.service.js:**

Implementa funciones async para:

- ✅ `createPost(postData, userId)` - Crea post validando facultad y asignando autor
  - Valida title (mínimo 3 caracteres)
  - Valida content (mínimo 10 caracteres)
  - Verifica que la facultad exista
  - Asigna automáticamente authorId desde userId
  - Devuelve post con relaciones pobladas

- ✅ `getAllPosts()` - Obtiene todos los posts
  - Devuelve posts ordenados por fecha descendente
  - Incluye relaciones (autor, facultad)

- ✅ `getPostById(postId)` - Obtiene un post específico
  - Lanza error si no existe
  - Devuelve con relaciones populadas

- ✅ `updatePost(postId, updateData, userId)` - Actualiza post (solo autor)
  - Valida ownership: post.authorId === userId
  - Solo permite editar: title, content
  - Rechaza cambios de authorId o facultyId
  - Valida longitudes mínimas
  - Lanza error si no es el autor

- ✅ `deletePost(postId, userId)` - Elimina post (solo autor)
  - Valida ownership
  - Lanza error si no es el autor

- ✅ `getPostsByAuthor(authorId)` - Posts de un autor

- ✅ `getPostsByFaculty(facultyId)` - Posts de una facultad

**Características de post.service.js:**

- Validaciones completas en cada operación
- Manejo de errors descriptivos
- Control de ownership para actualizar y eliminar
- NO maneja req/res
- SOLO usa post.repository para acceso a datos
- Lógica de negocio centralizada
- Async/await con try/catch

**Detalles de faculty.service.js:**

Implementa funciones async para:

- ✅ `createFaculty(facultyData)` - Crea facultad
  - Valida name (mínimo 3 caracteres)
  - Verifica que no exista facultad duplicada
  - Permite description opcional

- ✅ `getAllFaculties()` - Obtiene todas las facultades
  - Devuelve ordenadas por fecha

- ✅ `getFacultyById(facultyId)` - Obtiene facultad por ID
  - Lanza error si no existe

- ✅ `updateFaculty(facultyId, updateData)` - Actualiza facultad
  - Valida existencia previa
  - Verifica que el nombre sea único (si se cambio)
  - Permite actualizar: name, description
  - Valida longitudes mínimas

- ✅ `deleteFaculty(facultyId)` - Elimina facultad
  - Valida existencia
  - TODO: Considerar impacto en posts

- ✅ `getFacultyCount()` - Obtiene total de facultades

**Características de faculty.service.js:**

- Validaciones completas
- Prevención de duplicados (por nombre)
- Manejo de errors descriptivos
- NO maneja req/res
- SOLO usa faculty.repository para acceso a datos
- Lógica de negocio centralizada
- Async/await con try/catch

**Estado Actual:**

```
✅ post.service.js completado (320+ líneas, 7 funciones)
✅ faculty.service.js completado (260+ líneas, 6 funciones)
✅ Lógica de negocio separada de controllers
✅ Validaciones en capa de servicios
✅ Control de ownership en posts
✅ Integración limpia con repositories
✅ Sin dependencia de req/res
✅ Arquitectura en capas completada
```

---

### ✅ Fase 6: Controladores (COMPLETADA)

**Objetivos Alcanzados:**

- [x] Crear post.controller.js con 7 funciones
- [x] Crear faculty.controller.js con 6 funciones
- [x] Conectar con servicios existentes
- [x] Manejo de errores HTTP consistente
- [x] Respuestas JSON estandarizadas
- [x] Manejo de req/res sin lógica de negocio

**Archivos Creados:**

| Archivo                 | Descripción                       | Funciones |
| ----------------------- | --------------------------------- | --------- |
| `post.controller.js`    | Endpoints para CRUD de posts      | 7         |
| `faculty.controller.js` | Endpoints para CRUD de facultades | 6         |

**Detalles de post.controller.js:**

Implementa endpoints para:

- ✅ `createPost(req, res)` - POST /posts (201 Created)
- ✅ `getAllPosts(req, res)` - GET /posts (200 OK)
- ✅ `getPostById(req, res)` - GET /posts/:id (200 OK)
- ✅ `updatePost(req, res)` - PUT /posts/:id (200 OK, solo autor)
- ✅ `deletePost(req, res)` - DELETE /posts/:id (200 OK, solo autor)
- ✅ `getPostsByAuthor(req, res)` - GET /posts/author/:authorId (200 OK)
- ✅ `getPostsByFaculty(req, res)` - GET /posts/faculty/:facultyId (200 OK)

**Características:**

- Manejo limpio de req/res
- Extrae userId de req.user para operaciones autenticadas
- Respuestas JSON consistentes: `{ success, message, data }`
- Códigos HTTP automáticos basados en errores de services
- Try/catch en todos los endpoints
- Sin lógica de negocio (delegada a services)

**Detalles de faculty.controller.js:**

Implementa endpoints para:

- ✅ `createFaculty(req, res)` - POST /faculties (201 Created)
- ✅ `getAllFaculties(req, res)` - GET /faculties (200 OK)
- ✅ `getFacultyById(req, res)` - GET /faculties/:id (200 OK)
- ✅ `updateFaculty(req, res)` - PUT /faculties/:id (200 OK)
- ✅ `deleteFaculty(req, res)` - DELETE /faculties/:id (200 OK)
- ✅ `getFacultyCount(req, res)` - GET /faculties/count/total (200 OK)

**Características:**

- Controllers livianos y enfocados
- Respuestas HTTP estandarizadas
- Manejo de errores con status automático
- Separación clara de responsabilidades
- Listos para conectar con rutas

**Estado Actual:**

```
✅ post.controller.js completado (7 funciones)
✅ faculty.controller.js completado (6 funciones)
✅ Respuestas JSON consistentes en toda la capa
✅ Manejo de req/res separado de lógica de negocio
✅ Códigos HTTP correctos (201, 200, 400, 403, 404, 500)
✅ Arquitectura en capas completada hasta controllers
```

---

### ✅ Fase 7: Rutas y Middlewares (COMPLETADA)

**Objetivos Alcanzados:**

- [x] Middleware de error centralizado
- [x] Middleware de validación reutilizable
- [x] Rutas de posts con protección de autenticación
- [x] Rutas de facultades
- [x] Manejo completo de errores centralizado
- [x] Validaciones en endpoints

**Archivos Creados:**

| Archivo                  | Descripción                                             |
| ------------------------ | ------------------------------------------------------- |
| `error.middleware.js`    | Middleware central para manejo de errores               |
| `validate.middleware.js` | Validadores reutilizables (6 funciones)                 |
| `post.routes.js`         | Rutas de posts (7 endpoints, 4 públicos + 3 protegidos) |
| `faculty.routes.js`      | Rutas de facultades (6 endpoints)                       |
| `app.js`                 | Actualizado con imports de middleware y rutas           |

**Detalles de error.middleware.js:**

Middleware de error centralizado con firma `(err, req, res, next)`:

- ✅ Captura automática de `error.status` (default: 500)
- ✅ Respuesta JSON: `{ success: false, message, status }`
- ✅ Stack trace solo en desarrollo (NODE_ENV === 'development')
- ✅ Registrado al FINAL de app.js para capturar todos los errores

**Detalles de validate.middleware.js:**

6 validadores reutilizables y componibles:

1. **validateRequiredFields(fields)** - Valida campos requeridos
2. **validateEmail(fieldName)** - Valida formato de email
3. **validateMinLength(fieldName, minLength)** - Valida longitud mínima
4. **validateMongoId(paramName)** - Valida MongoDB ObjectId (24 caracteres hex)
5. **validateEnum(fieldName, allowedValues)** - Valida valores permitidos
6. **validateNumber(fieldName)** - Valida que sea número

**Ejemplo de Uso:**

```javascript
// En una ruta
router.post(
  "/",
  validateRequiredFields(["email", "password"]),
  validateEmail("email"),
  validateMinLength("password", 8),
  controller.register,
);
```

**Detalles de post.routes.js:**

7 rutas completamente funcionales:

| Método | Endpoint                        | Protección     | Función             |
| ------ | ------------------------------- | -------------- | ------------------- |
| GET    | `/api/posts`                    | Pública        | getAllPosts()       |
| GET    | `/api/posts/:id`                | Pública        | getPostById()       |
| POST   | `/api/posts`                    | authMiddleware | createPost()        |
| PUT    | `/api/posts/:id`                | authMiddleware | updatePost()        |
| DELETE | `/api/posts/:id`                | authMiddleware | deletePost()        |
| GET    | `/api/posts/author/:authorId`   | Pública        | getPostsByAuthor()  |
| GET    | `/api/posts/faculty/:facultyId` | Pública        | getPostsByFaculty() |

**Detalles de faculty.routes.js:**

6 rutas completamente funcionales:

| Método | Endpoint                     | Función           |
| ------ | ---------------------------- | ----------------- |
| GET    | `/api/faculties`             | getAllFaculties() |
| GET    | `/api/faculties/:id`         | getFacultyById()  |
| POST   | `/api/faculties`             | createFaculty()   |
| PUT    | `/api/faculties/:id`         | updateFaculty()   |
| DELETE | `/api/faculties/:id`         | deleteFaculty()   |
| GET    | `/api/faculties/count/total` | getFacultyCount() |

**Flujo Completo de Error Handling:**

```
REQUEST
  ↓
ROUTES (Express Router)
  ↓
VALIDATION MIDDLEWARE (validateRequiredFields, etc.)
  ↓
AUTH MIDDLEWARE (authMiddleware si es POST/PUT/DELETE)
  ↓
CONTROLLER (maneja req/res, llama service)
  ↓
SERVICE (lógica de negocio, puede lanzar errores)
  ↓
REPOSITORY (acceso a DB, puede lanzar errores)
  ↓
ERROR MIDDLEWARE (captura y formatea error)
  ↓
RESPONSE JSON
```

**Estado Actual:**

```
✅ error.middleware.js - Manejo centralizado de errores
✅ validate.middleware.js - 6 validadores reutilizables
✅ post.routes.js - 7 endpoints funcionales
✅ faculty.routes.js - 6 endpoints funcionales
✅ app.js - Rutas y middleware registrados
✅ Servidor iniciando correctamente en puerto 8080
✅ MongoDB conectado exitosamente
✅ Arquitectura profesional y escalable completada
```

---

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: Exportaciones de Módulos Incorrectas

**Fecha:** 7 de mayo, 2026

**Descripción:**

Al iniciar el servidor con `npm run dev`, se obtiene el siguiente error:

```

SyntaxError: The requested module './environment.config.js' does not
provide an export named 'config'

```

**Causa Raíz:**

En `environment.config.js` se estaba exportando:

```javascript
export const ENVIRONMENT = { ... }
```

Pero en `mongoDB.config.js` se importaba:

```javascript
import { config } from "./environment.config.js";
```

El nombre de la exportación no coincidía con el nombre del import.

**Solución Implementada:**

Se unificaron los nombres de las exportaciones:

**environment.config.js:**

```javascript
export const ENVIRONMENT = {
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
```

**mongoDB.config.js:**

```javascript
import { ENVIRONMENT } from "./environment.config.js";
```

**Resultado:**

✅ Error resuelto. Servidor inicia correctamente.

---

### Problema 2: Rutas de Archivos en Windows vs Git Bash

**Fecha:** 7 de mayo, 2026

**Descripción:**

Al ejecutar comando con rutas Windows, Git Bash no reconocía el path:

```bash
$ cd c:\Users\gonza\Projects\campus-connecion-app\Backend
bash: cd: c:UsersgonzaProjectscampus-connecion-appBackend: No such file or directory
```

**Causa Raíz:**

Git Bash interpreta las barras invertidas `\` como caracteres de escape, no como separadores de ruta.

**Solución Implementada:**

Convertir rutas Windows a formato Git Bash:

```bash
# ❌ Incorrecto
cd c:\Users\gonza\Projects\campus-connecion-app\Backend

# ✅ Correcto
cd /c/Users/gonza/Projects/campus-connecion-app/Backend
```

**Resultado:**

✅ Rutas funcionan correctamente en Git Bash.

---

### Problema 3: Variables de Entorno No Cargadas

**Fecha:** 7 de mayo, 2026 (Potencial)

**Descripción:**

Si se olvida importar/configurar `dotenv.config()`, las variables de `.env` no se cargarán.

**Prevención:**

En `environment.config.js` se agregó al inicio:

```javascript
import dotenv from "dotenv";
dotenv.config(); // ✅ DEBE ir antes de usar process.env
```

**Buena Práctica:**

- ✅ Cargar dotenv en la primera importación
- ✅ Validar que variables críticas existan
- ✅ Usar valores por defecto razonables

---

## 🔌 Endpoints

### Health Check

**GET /health**

Verifica que la API está funcionando.

**Response:**

```json
{
  "success": true,
  "message": "API working"
}
```

**Status Code:** 200

---

### Autenticación (Próximo)

| Método | Endpoint                    | Descripción             | Protegido |
| ------ | --------------------------- | ----------------------- | --------- |
| POST   | `/auth/register`            | Registrar nuevo usuario | No        |
| GET    | `/auth/verify-email/:token` | Verificar email         | No        |
| POST   | `/auth/login`               | Iniciar sesión          | No        |
| GET    | `/auth/profile`             | Obtener perfil          | **Sí**    |

---

### Facultades (Próximo)

| Método | Endpoint     | Descripción                 |
| ------ | ------------ | --------------------------- |
| GET    | `/faculties` | Listar todas las facultades |
| POST   | `/faculties` | Crear nueva facultad        |

---

### Posts (Próximo)

| Método | Endpoint     | Descripción            | Protegido |
| ------ | ------------ | ---------------------- | --------- |
| GET    | `/posts`     | Listar todos los posts | No        |
| GET    | `/posts/:id` | Obtener un post        | No        |
| POST   | `/posts`     | Crear post             | Sí        |
| PUT    | `/posts/:id` | Editar post            | Sí        |
| DELETE | `/posts/:id` | Eliminar post          | Sí        |

---

## 📊 Modelos de Datos

### User ✅ (COMPLETADO)

```javascript
{
  _id: ObjectId,
  email: String (único, requerido, validado, minúscula),
  password: String (hasheada, requerida, no incluida por defecto),
  isVerified: Boolean (default: false),
  verificationToken: String (no incluida por defecto),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

**Características:**

| Campo               | Tipo    | Validación                       | Notas                         |
| ------------------- | ------- | -------------------------------- | ----------------------------- |
| `email`             | String  | Formato, Unique, Trim, Lowercase | Índice para búsquedas rápidas |
| `password`          | String  | Requerido                        | Select: false (privado)       |
| `isVerified`        | Boolean | Default: false                   | Para verificación de email    |
| `verificationToken` | String  | Opcional                         | Select: false (privado)       |
| `createdAt`         | Date    | Automático                       | Timestamp                     |
| `updatedAt`         | Date    | Automático                       | Timestamp                     |

**Validaciones:**

- ✅ Email con regex de validación
- ✅ Email único en la colección
- ✅ Email normalizado (trim + lowercase)
- ✅ Mensaje de error personalizado

**Índices:**

- ✅ Índice en `email` para búsquedas O(1)

---

### Faculty ✅ (COMPLETADO)

```javascript
{
  _id: ObjectId,
  name: String (único, requerido, minlength: 3),
  description: String (opcional),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

**Características:**

| Campo         | Tipo   | Validación                           | Notas                         |
| ------------- | ------ | ------------------------------------ | ----------------------------- |
| `name`        | String | Único, Requerido, Trim, Minlength: 3 | Índice para búsquedas rápidas |
| `description` | String | Opcional                             | Trim automático               |
| `createdAt`   | Date   | Automático                           | Timestamp                     |
| `updatedAt`   | Date   | Automático                           | Timestamp                     |

**Validaciones:**

- ✅ Name único en la colección
- ✅ Name con minlength de 3 caracteres
- ✅ Trim automático en name y description
- ✅ Mensaje de error personalizado

**Índices:**

- ✅ Índice en `name` para búsquedas O(1)

---

### Post ✅ (COMPLETADO)

```javascript
{
  _id: ObjectId,
  title: String (requerido, minlength: 3),
  content: String (requerido, minlength: 10),
  authorId: ObjectId (referencia a User, requerido),
  facultyId: ObjectId (referencia a Faculty, requerido),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

**Características:**

| Campo       | Tipo     | Validación                     | Notas                 |
| ----------- | -------- | ------------------------------ | --------------------- |
| `title`     | String   | Requerido, Trim, Minlength: 3  | Resumen del post      |
| `content`   | String   | Requerido, Trim, Minlength: 10 | Contenido principal   |
| `authorId`  | ObjectId | Requerido, Ref: User           | Relación con autor    |
| `facultyId` | ObjectId | Requerido, Ref: Faculty        | Relación con facultad |
| `createdAt` | Date     | Automático                     | Timestamp             |
| `updatedAt` | Date     | Automático                     | Timestamp             |

**Validaciones:**

- ✅ Title con minlength de 3 caracteres
- ✅ Content con minlength de 10 caracteres
- ✅ AuthorId referencia obligatoria a User
- ✅ FacultyId referencia obligatoria a Faculty
- ✅ Trim automático en campos texto
- ✅ Mensajes de error personalizados

**Índices:**

- ✅ Índice en `authorId` para búsquedas por autor O(1)
- ✅ Índice en `facultyId` para búsquedas por facultad O(1)
- ✅ Índice en `createdAt` descendente para ordenar cronológicamente

**Relaciones:**

- ✅ Post → User (mediante authorId, usable con populate())
- ✅ Post → Faculty (mediante facultyId, usable con populate())

---

## 🔐 Autenticación

### Flujo de Autenticación

1. **Registro (POST /auth/register)**
   - Usuario envía email y contraseña
   - Se valida formato y contraseña se hashea
   - Se crea token de verificación
   - Se guarda usuario con `isVerified: false`
   - Se envía email con link de verificación

2. **Verificación (GET /auth/verify-email/:token)**
   - Usuario hace click en link del email
   - Se busca usuario por token
   - Se marca como `isVerified: true`
   - Se elimina token

3. **Login (POST /auth/login)**
   - Usuario envía email y contraseña
   - Se valida que esté verificado
   - Se valida contraseña contra hash
   - Se genera JWT con expiración
   - Se devuelve Bearer token

### Middleware de Autenticación (Próximo)

```javascript
// Uso en rutas protegidas
router.post("/posts", authMiddleware, createPost);
```

El middleware:

- Lee `Authorization: Bearer <token>`
- Valida y decodifica JWT
- Agrega usuario a `req.user`

---

## 📚 Buenas Prácticas Implementadas

### ✅ Arquitectura en Capas

- Separación clara de responsabilidades
- Cada capa tiene un propósito específico
- Código mantenible y testeable

### ✅ ES Modules

```javascript
// ✅ Import/Export moderno
import express from 'express';
export const conectDB = async () => { ... }
```

### ✅ Manejo de Errores

- Try/catch en funciones async
- Validaciones en controllers
- Middleware centralizado de errores

### ✅ Variables de Entorno

- Usando dotenv
- `.env` en .gitignore
- `.env.example` como referencia

### ✅ Nombres Consistentes

- camelCase para variables
- Nombres descriptivos
- Convenciones de Express

### ✅ Comentarios y Documentación

- Código auto-explicativo
- README detallado
- Documentación de problemas y soluciones

---

## �️ Utilidades Implementadas

### hash.js ✅

**Funciones exportadas:**

#### `hashPassword(password)`

Genera un hash seguro de la contraseña usando bcrypt con salt rounds = 10.

```javascript
import { hashPassword } from "./src/utils/hash.js";

const hashedPassword = await hashPassword("miContraseña123");
// Devuelve: $2b$10$...hash...
```

**Parámetros:**

- `password` (string) - Contraseña en texto plano

**Devuelve:**

- Promise<string> - Hash de la contraseña

**Uso en el flujo:**

- Registro de usuarios
- Cambio de contraseña

---

#### `comparePassword(password, hashedPassword)`

Compara una contraseña en texto plano con su hash almacenado.

```javascript
import { comparePassword } from "./src/utils/hash.js";

const isValid = await comparePassword("miContraseña123", hashedPassword);
// Devuelve: true o false
```

**Parámetros:**

- `password` (string) - Contraseña en texto plano
- `hashedPassword` (string) - Hash almacenado en BD

**Devuelve:**

- Promise<boolean> - true si coinciden, false si no

**Uso en el flujo:**

- Login de usuarios
- Validación de credenciales

---

### jwt.js ✅

**Funciones exportadas:**

#### `generateToken(payload, expiresIn)`

Genera un JWT con el payload especificado y expiración.

```javascript
import { generateToken } from "./src/utils/jwt.js";

const token = generateToken(
  { userId: "123", email: "user@example.com" },
  "24h",
);
// Devuelve: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Parámetros:**

- `payload` (object) - Datos a incluir en el token (ej: { userId, email })
- `expiresIn` (string, optional) - Tiempo de expiración (default: '24h')

**Devuelve:**

- string - Token JWT firmado

**Uso en el flujo:**

- Login de usuarios - Retornar token de acceso
- Verificación de email - Generar token temporal

---

#### `verifyToken(token)`

Verifica y decodifica un JWT.

```javascript
import { verifyToken } from "./src/utils/jwt.js";

const decoded = verifyToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
// Devuelve: { userId: '123', email: 'user@example.com', iat: 1234567890, exp: 1234671690 }
```

**Parámetros:**

- `token` (string) - Token JWT (puede incluir "Bearer " al inicio)

**Devuelve:**

- object - Payload decodificado del token

**Excepciones:**

- "Token has expired" - Si el token expiró
- "Invalid token" - Si el token es inválido
- "Error verifying token: ..." - Otros errores

**Uso en el flujo:**

- Middleware de autenticación - Validar JWT del request
- Verificación de email - Validar token temporal

---

#### `generateVerificationToken(userId)`

Genera un token de verificación de email con expiración de 24h.

```javascript
import { generateVerificationToken } from "./src/utils/jwt.js";

const verificationToken = generateVerificationToken("123");
// Devuelve: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Parámetros:**

- `userId` (string) - ID del usuario

**Devuelve:**

- string - Token de verificación JWT

**Uso en el flujo:**

- Registro de usuarios - Generar token para verificación de email
- Cambio de email - Generar token temporal para validar nuevo email

---

### email.js ✅

**Funciones exportadas:**

#### `sendVerificationEmail(email, verificationToken, frontendUrl)`

Envía un email de verificación con HTML personalizado y enlace de verificación.

```javascript
import { sendVerificationEmail } from "./src/utils/email.js";

await sendVerificationEmail(
  "user@example.com",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "http://localhost:3000",
);
```

**Parámetros:**

- `email` (string) - Correo electrónico del usuario
- `verificationToken` (string) - Token JWT de verificación
- `frontendUrl` (string, optional) - URL del frontend (default: 'http://localhost:3000')

**Devuelve:**

- Promise<void>

**Características:**

- ✅ HTML personalizado y profesional
- ✅ Incluye link de verificación con token
- ✅ Enlace válido por 24 horas
- ✅ Asunto en español

**Uso en el flujo:**

- Registro de usuarios - Enviar email con link de verificación
- Cambio de email - Validar nuevo correo

---

#### `sendEmail(email, subject, htmlContent)`

Envía un email genérico con contenido personalizado.

```javascript
import { sendEmail } from "./src/utils/email.js";

await sendEmail(
  "user@example.com",
  "Bienvenido a CampusConnect",
  "<h1>¡Hola!</h1><p>Contenido del email</p>",
);
```

**Parámetros:**

- `email` (string) - Correo electrónico del destinatario
- `subject` (string) - Asunto del email
- `htmlContent` (string) - Contenido HTML del email

**Devuelve:**

- Promise<void>

**Uso en el flujo:**

- Notificaciones generales
- Emails transaccionales
- Cambios en la cuenta

---

#### `verifyEmailConnection()`

Verifica que el servicio de email esté configurado correctamente y conectado.

```javascript
import { verifyEmailConnection } from "./src/utils/email.js";

const isConnected = await verifyEmailConnection();
// Devuelve: true o false
```

**Parámetros:**

- Ninguno

**Devuelve:**

- Promise<boolean> - true si conectado, false si hay error

**Efecto Secundario:**

- Imprime en consola: ✅ Email service is ready
- En caso de error: ❌ Email service error: [mensaje]

**Uso en el flujo:**

- Servidor.js - Verificar conexión al iniciar
- Antes de enviar emails en producción

---

## 🔐 Servicios de Autenticación

### auth.service.js ✅

**Funciones exportadas:**

#### `registerUser(email, password, frontendUrl)`

Registra un nuevo usuario con verificación de email.

```javascript
import { registerUser } from "./src/services/auth.service.js";

const result = await registerUser(
  "user@example.com",
  "securePassword123",
  "http://localhost:3000",
);
// Devuelve: { userId, email, isVerified: false, message }
```

**Parámetros:**

- `email` (string) - Correo electrónico del usuario
- `password` (string) - Contraseña en texto plano
- `frontendUrl` (string, optional) - URL del frontend (default: 'http://localhost:3000')

**Devuelve:**

- object - { userId, email, isVerified, message }

**Proceso:**

1. Valida que email no exista
2. Hashea la contraseña con bcrypt
3. Genera token de verificación JWT
4. Crea usuario en BD con `isVerified: false`
5. Envía email con link de verificación
6. Devuelve datos del usuario sin contraseña

**Excepciones:**

- "Email is already registered" - Email duplicado
- "Email and password are required" - Parámetros faltantes

---

#### `verifyUserEmail(token)`

Verifica el email del usuario usando el token de verificación.

```javascript
import { verifyUserEmail } from "./src/services/auth.service.js";

const result = await verifyUserEmail("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
// Devuelve: { userId, email, isVerified: true, message }
```

**Parámetros:**

- `token` (string) - Token JWT de verificación del email

**Devuelve:**

- object - { userId, email, isVerified: true, message }

**Proceso:**

1. Verifica y decodifica el JWT
2. Busca usuario con ese token de verificación
3. Marca como `isVerified: true`
4. Elimina el token de verificación
5. Guarda cambios

**Excepciones:**

- "Invalid or expired verification token" - Token inválido o expirado
- "Verification token is required" - Token no proporcionado

---

#### `loginUser(email, password)`

Autentica un usuario y devuelve JWT de acceso.

```javascript
import { loginUser } from "./src/services/auth.service.js";

const result = await loginUser("user@example.com", "securePassword123");
// Devuelve: { token, userId, email, message }
```

**Parámetros:**

- `email` (string) - Correo electrónico del usuario
- `password` (string) - Contraseña en texto plano

**Devuelve:**

- object - { token (JWT), userId, email, message }

**Proceso:**

1. Busca usuario por email (con password incluido)
2. Compara contraseña con bcrypt
3. Verifica que `isVerified: true`
4. Genera JWT con userId y email
5. Devuelve token de acceso

**Excepciones:**

- "Invalid email or password" - Email no existe o contraseña incorrecta
- "Please verify your email before logging in" - Email no verificado

---

#### `getUserById(userId)`

Obtiene datos de un usuario por su ID.

```javascript
import { getUserById } from "./src/services/auth.service.js";

const user = await getUserById("123abc");
// Devuelve: { userId, email, isVerified, createdAt }
```

**Parámetros:**

- `userId` (string) - ID del usuario (ObjectId)

**Devuelve:**

- object - { userId, email, isVerified, createdAt }

**Excepciones:**

- "User not found" - Usuario no existe

---

#### `getUserByEmail(email)`

Obtiene datos de un usuario por su email.

```javascript
import { getUserByEmail } from "./src/services/auth.service.js";

const user = await getUserByEmail("user@example.com");
// Devuelve: { userId, email, isVerified, createdAt }
```

**Parámetros:**

- `email` (string) - Correo electrónico del usuario

**Devuelve:**

- object - { userId, email, isVerified, createdAt }

**Excepciones:**

- "User not found" - Usuario no existe

---

## �� Scripts Disponibles

```bash
# Iniciar en desarrollo (con Nodemon)
npm run dev

# Iniciar en producción
npm start

# Instalar dependencias
npm install
```

---

## 📦 Dependencias

### Dependencias Principales

- **express** ^5.2.1 - Framework web
- **mongoose** ^9.2.1 - ODM para MongoDB
- **cors** ^2.8.6 - Control de acceso
- **dotenv** ^17.2.4 - Variables de entorno
- **bcrypt** ^6.0.0 - Hash de contraseñas
- **jsonwebtoken** ^9.0.3 - JWT para autenticación
- **nodemailer** ^8.0.2 - Envío de emails

### Dev Dependencies

- **nodemon** ^3.0.1 - Reinicio automático en desarrollo

---

## 🚀 Próximos Pasos

### Inmediatos (Completadas)

1. ✅ **Fase 1: Configuración Inicial** - COMPLETADA
   - ✅ Express server funcionando
   - ✅ MongoDB conectado
   - ✅ .env configurado
   - ✅ Health endpoint

2. ✅ **Fase 2: Modelos de Datos** - COMPLETADA
   - ✅ User model con validaciones
   - ✅ Faculty model con índices
   - ✅ Post model con relaciones

3. ✅ **Fase 3: Autenticación** - COMPLETADA (100%)
   - ✅ Utilidades (hash, JWT, email)
   - ✅ Servicios (auth.service.js)
   - ✅ Controladores (auth.controller.js)
   - ✅ Rutas (auth.routes.js)
   - ✅ Middleware (auth.middleware.js)

4. ✅ **Fase 4: Repositorios** - COMPLETADA (100%) + REFACTORIZADA
   - ✅ BaseRepository (clase base genérica - 156 líneas, 10 métodos)
   - ✅ User repository (refactorizado - 130 líneas, -60% código)
   - ✅ Faculty repository (refactorizado - 138 líneas, -60% código)
   - ✅ Post repository (refactorizado - 140 líneas, -70% código)

### Corto Plazo (Próximo)

5. ✅ **Fase 5: Servicios** - COMPLETADA (100%)
   - ✅ Post service (7 funciones, lógica de negocio)
   - ✅ Faculty service (6 funciones, lógica de negocio)
   - ✅ Validaciones completas
   - ✅ Control de ownership
   - ✅ Errores personalizados (ValidationError, NotFoundError, AuthorizationError, ConflictError)

6. ✅ **Fase 6: Controladores** - COMPLETADA (100%)
   - ✅ Post controller (7 funciones)
   - ✅ Faculty controller (6 funciones)
   - ✅ Respuestas HTTP estandarizadas
   - ✅ Manejo de req/res sin lógica de negocio

### Mediano Plazo

7. ✅ **Fase 7: Rutas y Middlewares** - COMPLETADA (100%)
   - ✅ Rutas de posts (post.routes.js - 7 endpoints)
   - ✅ Rutas de facultades (faculty.routes.js - 6 endpoints)
   - ✅ Middleware de error centralizado
   - ✅ Middleware de validación (6 validadores)
   - ✅ Manejo completo de errores
   - ✅ Protección de rutas con authMiddleware

8. **Testing**
   - Tests unitarios para repositories
   - Tests unitarios para services
   - Tests de integración
   - Cobertura de código

### Largo Plazo

9. **Optimizaciones**
   - Rate limiting
   - Caché con Redis
   - Paginación en listados
   - Búsqueda avanzada
   - Ordenamiento dinámico

10. **Despliegue**
    - Configuración de producción
    - CI/CD con GitHub Actions
    - Monitoreo y logging
    - Docker setup

---

## 📝 Notas Importantes

### Variables de Entorno

**NUNCA** commitear `.env` con credenciales reales. Siempre usar `.env.example` como plantilla.

### Seguridad

- Contraseñas siempre hasheadas con bcrypt
- JWT con expiración
- CORS configurado
- Validación de inputs

### Rendimiento

- Usar populate() de Mongoose para relaciones
- Índices en campos frecuentemente consultados
- Paginación en listados

---

## 🤝 Contribuciones

Este es un proyecto educativo. Para mejoras o reportar problemas, documentar:

- Descripción clara del problema
- Pasos para reproducir
- Stack trace si aplica
- Solución propuesta

---

## 📄 Licencia

ISC

---

## 📧 Contacto

**Desarrollador:** Campus Connection Team

**Fecha de Inicio:** 7 de mayo, 2026

**Status:** En Desarrollo - Fase 7 Completada, Testing Próximo

---

**Última Actualización:** 9 de mayo, 2026 - Fase 7 Completada: error.middleware.js, validate.middleware.js, post.routes.js, faculty.routes.js y app.js. Backend completamente funcional con arquitectura en capas profesional, manejo centralizado de errores, validaciones reutilizables y listo para testing con Postman
