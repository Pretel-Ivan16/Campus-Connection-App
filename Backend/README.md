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
6. [Próximos Pasos](#próximos-pasos)

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

## 🚀 Próximos Pasos

- [ ] Testing con Jest
- [ ] Documentación API (Swagger)
- [ ] Paginación en listados
- [ ] Rate limiting
- [ ] Caché con Redis
- [ ] Despliegue en producción

---

## 📦 Tech Stack Resumen

- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Email:** Nodemailer
- **Other:** CORS, dotenv, nodemon

---

**Status:** ✅ Proyecto completado - 7 fases implementadas  
**Fecha:** 9 de mayo, 2026
