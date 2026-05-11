# 🎓 CampusConnect Backend

Proyecto de Backend desarrollado como Trabajo Final Integrador de la Diplomatura en Desarrollo Web Full Stack de la Universidad Tecnológica Nacional (UTN).

## Contexto Académico

Durante las clases Backend, estudiamos los fundamentos de la arquitectura en capas, patrones de diseño y buenas prácticas en desarrollo backend. Este proyecto implementa:

- **Arquitectura en capas**: Separación clara entre routes, controllers, services y repositories
- **Autenticación JWT**: Sistema seguro de tokens para proteger endpoints
- **Base de datos relacional**: Modelado de datos con Mongoose y MongoDB
- **Manejo de errores**: Sistema centralizado de error handling con clases personalizadas
- **Validación**: Middlewares reutilizables para validar inputs
- **Patrón BaseRepository**: Reutilización de código CRUD mediante herencia

## Sobre la Entrega en Recuperatorio

Este proyecto se entrega en el recuperatorio debido a compromisos académicos previos y las múltiples paros que afectaron el calendario académico de la UNR. A pesar de esto, el desarrollo se completó de manera integral siguiendo todos los estándares de calidad enseñados en clase.

---

## 📋 Tabla de Contenidos

1. [Descripción](#descripción)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Instalación](#instalación)
4. [Fases Completadas](#fases-completadas)
5. [Endpoints](#endpoints)
6. [Modelos](#-modelos)
7. [Arquitectura](#-arquitectura)
8. [Estructura de Carpetas](#-estructura-de-carpetas)
9. [Ejemplos de Requests/Responses](#-ejemplos-de-requestsresponses)
10. [Autenticación](#-autenticación)
11. [Troubleshooting](#-troubleshooting)
12. [Desarrollo Local](#-desarrollo-local)
13. [Próximas Mejoras](#-próximas-mejoras)
14. [Soporte](#-soporte)

---

## Descripción

CampusConnect es un backend para una plataforma de foro universitario. Permite a los usuarios registrarse, crear posts, organizarlos por facultades, y interactuar con autenticación segura mediante JWT.

**Funcionalidades principales:**

- Autenticación y registro de usuarios con email verification
- CRUD de posts con control de ownership
- Gestión de facultades
- Sistema de error handling centralizado
- Validaciones en todas las capas

---

## Stack Tecnológico

- **Node.js** - Runtime de JavaScript
- **Express.js 5.2.1** - Framework web
- **MongoDB + Mongoose 9.2.1** - Base de datos NoSQL
- **JWT (jsonwebtoken 9.0.3)** - Autenticación
- **bcrypt 6.0.0** - Hash de contraseñas
- **Nodemailer 8.0.2** - Envío de emails
- **CORS** - Configuración de orígenes
- **dotenv** - Variables de entorno

---

## 🚀 Instalación

### Requisitos

- Node.js >= 14
- npm >= 6
- MongoDB (cloud o local)

### Pasos

```bash
# 1. Clonar y navegar
cd campus-connecion-app/Backend

# 2. Instalar dependencias
npm install

# 3. Configurar .env
cp .env.example .env
# Actualizar: MONGODB_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS

# 4. Iniciar servidor (desarrollo)
npm run dev

# 5. Verificar health
curl http://localhost:8080/health
```

---

## ✅ Fases Completadas

### Fase 1: Configuración Base ✅

- Express server en puerto 8080
- MongoDB conectado con Mongoose
- Health endpoint funcional
- Variables de entorno con dotenv
- ES Modules configurado
- Nodemon para desarrollo

### Fase 2: Modelos de Datos ✅

- User model: email (unique), password (hashed), isVerified, verificationToken
- Faculty model: name (unique, min 3), description
- Post model: title (min 3), content (min 10), authorId, facultyId
- Índices en campos clave, timestamps automáticos

### Fase 3: Autenticación ✅

- Hash utilities con bcrypt
- JWT utilities con tokens de 24h
- Email utilities con Nodemailer
- Auth service (register, login, verify email)
- Auth middleware (authMiddleware, optionalAuthMiddleware)

### Fase 4: Repositorios ✅

- BaseRepository con métodos genéricos CRUD
- User repository (createUser, getUserById, getUserByEmail, etc.)
- Faculty repository (createFaculty, getFacultyById, etc.)
- Post repository con populate automático
- Reducción de código duplicado (~60-70%)

### Fase 5: Servicios ✅

- Post service (7 funciones CRUD + filtros)
- Faculty service (6 funciones CRUD)
- Validaciones completas en cada operación
- Control de ownership para posts
- Error classes personalizadas

### Fase 6: Controladores ✅

- Post controller (7 funciones)
- Faculty controller (6 funciones)
- Respuestas JSON estandarizadas
- Manejo de errores con try/catch
- Códigos HTTP automáticos

### Fase 7: Rutas y Middlewares ✅

- Error middleware centralizado
- Validation middleware (6 validadores)
- Post routes (7 endpoints)
- Faculty routes (6 endpoints)
- App.js con middleware en orden correcto

---

## 🔌 Endpoints

### Health

```
GET /health
```

### Autenticación

```
POST   /auth/register              - Registrar
GET    /auth/verify-email/:token   - Verificar email
POST   /auth/login                 - Login
GET    /auth/profile               - Perfil (protegido)
```

### Facultades

```
GET    /api/faculties              - Listar
GET    /api/faculties/:id          - Obtener
POST   /api/faculties              - Crear (protegido)
PUT    /api/faculties/:id          - Actualizar (protegido)
DELETE /api/faculties/:id          - Eliminar (protegido)
GET    /api/faculties/count/total  - Contar
```

### Posts

```
GET    /api/posts                       - Listar
GET    /api/posts/:id                   - Obtener
POST   /api/posts                       - Crear (protegido)
PUT    /api/posts/:id                   - Actualizar (protegido, solo autor)
DELETE /api/posts/:id                   - Eliminar (protegido, solo autor)
GET    /api/posts/author/:authorId     - Posts de un autor
GET    /api/posts/faculty/:facultyId   - Posts de una facultad
```

---

## 📊 Modelos

**User:** email (unique), password (hashed), isVerified, verificationToken, createdAt, updatedAt

**Faculty:** name (unique, min 3), description, createdAt, updatedAt

**Post:** title (min 3), content (min 10), authorId (User), facultyId (Faculty), createdAt, updatedAt

---

## 🏗️ Arquitectura

```
REQUEST → ROUTES → VALIDATION → AUTH → CONTROLLER → SERVICE → REPOSITORY → DB
                                                ↓
                                         ERROR MIDDLEWARE
                                                ↓
                                          RESPONSE JSON
```

---

## � Estructura de Carpetas

```
Backend/
├── src/
│   ├── config/              # Configuraciones (DB, env, mail)
│   │   ├── environment.config.js
│   │   ├── mongoDB.config.js
│   │   └── mailer.config.js
│   ├── controllers/         # Manejadores HTTP
│   │   ├── auth.controller.js
│   │   ├── post.controller.js
│   │   └── faculty.controller.js
│   ├── models/              # Esquemas Mongoose
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── faculty.model.js
│   ├── services/            # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── post.service.js
│   │   └── faculty.service.js
│   ├── repositories/        # Acceso a datos
│   │   ├── base.repository.js
│   │   ├── user.repository.js
│   │   ├── post.repository.js
│   │   └── faculty.repository.js
│   ├── routes/              # Definición de endpoints
│   │   ├── auth.routes.js
│   │   ├── post.routes.js
│   │   ├── faculty.routes.js
│   │   └── health.routes.js
│   ├── middlewares/         # Middleware personalizado
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── helpers/             # Utilidades y clases
│   │   ├── errors.js        # Clases de error personalizadas
│   │   ├── response.js
│   │   └── index.js
│   ├── utils/               # Funciones auxiliares
│   │   ├── hash.js          # bcrypt
│   │   ├── jwt.js           # JWT tokens
│   │   ├── email.js         # Nodemailer
│   │   └── generateToken.js
│   ├── app.js               # Configuración Express
│   └── server.js            # Entry point
├── .env                     # Variables de entorno (NO subir a Git)
├── .env.example             # Template de variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 Ejemplos de Requests/Responses

### 1️⃣ Registro de Usuario

**Request:**

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "Segura123!",
  "frontendUrl": "http://localhost:3000"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "usuario@example.com",
    "isVerified": false
  },
  "message": "User registered successfully. Check your email..."
}
```

### 2️⃣ Login de Usuario

**Request:**

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "Segura123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "507f1f77bcf86cd799439011",
    "email": "usuario@example.com"
  },
  "message": "Login successful"
}
```

### 3️⃣ Crear Post (Protegido)

**Request:**

```bash
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Mi primer post",
  "content": "Este es el contenido del post con más de 10 caracteres",
  "facultyId": "507f1f77bcf86cd799439012"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Mi primer post",
    "content": "Este es el contenido del post con más de 10 caracteres",
    "authorId": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "usuario@example.com"
    },
    "facultyId": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Ingeniería en Sistemas"
    },
    "createdAt": "2026-05-09T15:30:00.000Z",
    "updatedAt": "2026-05-09T15:30:00.000Z"
  },
  "message": "Post created successfully"
}
```

### 4️⃣ Obtener Todos los Posts

**Request:**

```bash
GET /api/posts
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Mi primer post",
      "content": "Contenido del post...",
      "authorId": {
        "_id": "507f1f77bcf86cd799439011",
        "email": "usuario@example.com"
      },
      "facultyId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Ingeniería en Sistemas"
      },
      "createdAt": "2026-05-09T15:30:00.000Z"
    }
  ],
  "message": "Posts fetched successfully"
}
```

### 5️⃣ Crear Facultad (Protegido)

**Request:**

```bash
POST /api/faculties
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ingeniería en Sistemas",
  "description": "Carrera de ingeniería enfocada en sistemas y software"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Ingeniería en Sistemas",
    "description": "Carrera de ingeniería enfocada en sistemas y software",
    "createdAt": "2026-05-09T15:30:00.000Z",
    "updatedAt": "2026-05-09T15:30:00.000Z"
  },
  "message": "Faculty created successfully"
}
```

---

## 🔐 Autenticación

### Obtener Token

1. **Registrarse:** `POST /auth/register`
2. **Verificar email** (link en email)
3. **Login:** `POST /auth/login` → recibe `token`

### Usar Token

Incluir en headers de requests protegidos:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiración

- **Duración:** 24 horas
- **Renovar:** Hacer login nuevamente

---

## 🐛 Troubleshooting

### "MongoDB connection error"

- ✅ Verificar `MONGODB_URL` en `.env`
- ✅ Verificar que MongoDB cloud está activo
- ✅ Verificar whitelist de IPs en MongoDB Atlas

### "JWT_SECRET is not defined"

- ✅ Asegurar que `JWT_SECRET` está en `.env`
- ✅ Generar uno: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### "Error sending verification email"

- ✅ Verificar `EMAIL_USER` y `EMAIL_PASS` en `.env`
- ✅ Usar contraseña de aplicación de Google (no contraseña de cuenta)
- ✅ Habilitar acceso de aplicaciones menos seguras

### "Authorization header is missing"

- ✅ Incluir `Authorization: Bearer <token>` en headers
- ✅ Verificar que el token no está expirado
- ✅ Formato correcto: `Bearer ` (con espacio)

### "Post not found" al actualizar

- ✅ Verificar que el `postId` es válido (MongoDB ObjectId)
- ✅ Verificar que el post existe
- ✅ Solo el autor puede actualizar posts

---

## 📚 Desarrollo Local

### Scripts disponibles

```bash
npm start    # Inicia servidor en producción
npm run dev  # Inicia con nodemon (recomendado para desarrollo)
npm test     # Ejecutar tests (no implementado aún)
```

### Variables de Entorno Necesarias

```
PORT=8080
MONGODB_URL=mongodb+srv://...
JWT_SECRET=tu_secreto_aqui
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_app
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Flujo de Desarrollo

1. Crear rama: `git checkout -b feature/nueva-feature`
2. Hacer cambios
3. Probar localmente con `npm run dev`
4. Hacer commit: `git commit -m "feat: descripción"`
5. Push y crear PR

---

## 🚀 Próximas Mejoras

- [ ] Implementar tests con Jest/Supertest
- [ ] Agregar paginación en endpoints de listado
- [ ] Implementar búsqueda de posts
- [ ] Sistema de comentarios en posts
- [ ] Ratings/likes en posts
- [ ] Roles de usuario (admin, moderator)
- [ ] Rate limiting
- [ ] Documentación con Swagger
- [ ] Docker setup
- [ ] Deployment en Heroku/Vercel

---

## 📞 Soporte

Para reportar bugs o sugerencias:

1. Abrir issue en GitHub
2. Describir el problema detalladamente
3. Incluir pasos para reproducir
4. Incluir versión de Node.js y sistema operativo

---

## 📝 Licencia

ISC License - Ver `package.json`

---

## 👨‍💻 Autor

Desarrollado por Gonzalo como trabajo final de la Diplomatura en Desarrollo Web Full Stack - UTN

---

**Status:** ✅ Proyecto completado - 7 fases implementadas  
**Última actualización:** 10 de mayo, 2026
