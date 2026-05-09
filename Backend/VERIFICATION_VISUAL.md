# 📱 Guía Visual - Verificación en Postman

## 🎯 Objetivo

Registrar un usuario, recibir email de verificación, verificar el email en Postman, y ver el cambio en MongoDB.

---

## 🔧 ANTES DE EMPEZAR

### Requisito 1: Configurar `.env`

En `Backend/.env`:

```env
PORT=8080
MONGODB_URL=mongodb://localhost:27017/campus-connect
JWT_SECRET=secreto_super_seguro_cambiar_en_produccion
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=contraseña_app_de_gmail_de_16_caracteres
FRONTEND_URL=http://localhost:3000
```

### Requisito 2: Iniciar Servidor

```bash
cd Backend
npm start
```

Debes ver:

```
Server running on port 8080
Email service is ready
```

### Requisito 3: MongoDB Corriendo

MongoDB debe estar ejecutándose en `localhost:27017`

### Requisito 4: Postman

Descargado y abierto

---

## 📋 PASO A PASO

### FASE 1: REGISTRO

#### 📌 En Postman - Request 1

**Tab 1:**

- Método: `POST`
- URL: `http://localhost:8080/api/auth/register`

**Tab Headers:**

```
Content-Type: application/json
```

**Tab Body (raw, JSON):**

```json
{
  "email": "test@ejemplo.com",
  "password": "Test123456!",
  "frontendUrl": "http://localhost:3000"
}
```

**Click SEND** ➜ Espera respuesta

**Deberías ver (Status 201):**

```json
{
  "success": true,
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "test@ejemplo.com",
    "isVerified": false,
    "message": "User registered successfully. Check your email to verify your account."
  },
  "message": "User registered successfully. Check your email to verify your account."
}
```

**✅ En MongoDB se creó:**

```
users
├── _id: ObjectId("507f1f77bcf86cd799439011")
├── email: "test@ejemplo.com"
├── password: "$2b$10$..." (hasheada)
├── isVerified: false       ← 🔑 IMPORTANTE
├── verificationToken: "eyJhbGciOiJIUzI1NiI..." ← El token
└── createdAt: 2026-05-08T14:30:00Z
```

---

### FASE 2: RECIBIR EMAIL

#### 📧 En tu Bandeja de Gmail

Busca email de: `tu_email@gmail.com`
Con asunto: `Verifica tu correo electrónico - CampusConnect`

Dentro del email verás algo así:

```
¡Bienvenido a CampusConnect!

Hola,

Gracias por registrarte en CampusConnect. Para completar tu registro,
por favor verifica tu correo electrónico haciendo clic aquí:

[  VERIFICAR EMAIL  ]

O copia y pega este enlace en tu navegador:
http://localhost:3000/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0QGVqZW1wbG8uY29tIiwiaWF0IjoxNjg2MjEwNjAwLCJleHAiOjE2ODYyOTcwMDB9.abc123...

Este enlace expirará en 24 horas.
```

#### 🔑 Copia el Token

El token está entre `token=` y el final:

```
TOKEN_COMPLETO = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0QGVqZW1wbG8uY29tIiwiaWF0IjoxNjg2MjEwNjAwLCJleHAiOjE2ODYyOTcwMDB9.abc123...
```

**Cópialo completo** (todos esos caracteres largos)

---

### FASE 3: VERIFICACIÓN EN POSTMAN

#### 📌 En Postman - Request 2

**Tab 1:**

- Método: `GET`
- URL: `http://localhost:8080/api/auth/verify-email/PEGA_EL_TOKEN_AQUI`

Reemplaza `PEGA_EL_TOKEN_AQUI` con el token que copiaste del email.

Debería verse así:

```
http://localhost:8080/api/auth/verify-email/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0QGVqZW1wbG8uY29tIiwiaWF0IjoxNjg2MjEwNjAwLCJleHAiOjE2ODYyOTcwMDB9.abc123...
```

**Click SEND** ➜ Espera respuesta

**Deberías ver (Status 200):**

```json
{
  "success": true,
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "test@ejemplo.com",
    "isVerified": true,
    "message": "Email verified successfully"
  }
}
```

**✅ En MongoDB cambió:**

```
users
├── _id: ObjectId("507f1f77bcf86cd799439011")
├── email: "test@ejemplo.com"
├── password: "$2b$10$..."
├── isVerified: true        ← ✅ CAMBIÓ A TRUE!
├── verificationToken: null ← Se eliminó
└── updatedAt: 2026-05-08T14:35:00Z
```

---

### FASE 4: VERIFICAR EN MONGODB

#### 🔍 En MongoDB Compass

1. Abre **MongoDB Compass**
2. Conecta a: `mongodb://localhost:27017`
3. Base de datos: `campus-connect`
4. Colección: `users`
5. Busca tu usuario:
   ```
   { "email": "test@ejemplo.com" }
   ```

**Verás el documento:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "email": "test@ejemplo.com",
  "password": "$2b$10$NJ1v3H.y9H/oG8N7h9.zWe",
  "isVerified": true,          ← ✅ YA ESTÁ EN TRUE!
  "verificationToken": null,   ← Ya no existe
  "createdAt": ISODate("2026-05-08T14:30:00Z"),
  "updatedAt": ISODate("2026-05-08T14:35:00Z")
}
```

---

### FASE 5: LOGIN (OPCIONAL)

Ahora que está verificado, puedes hacer login:

#### 📌 En Postman - Request 3

**Tab 1:**

- Método: `POST`
- URL: `http://localhost:8080/api/auth/login`

**Tab Body:**

```json
{
  "email": "test@ejemplo.com",
  "password": "Test123456!"
}
```

**Click SEND**

**Deberías ver (Status 200):**

```json
{
  "success": true,
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "test@ejemplo.com",
    "isVerified": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE2ODYyMTMwMDB9.xyz789...",
    "message": "Login successful"
  }
}
```

**💾 Guarda el token en Postman:**

1. Ve a **Environment** (engranaje arriba a la derecha)
2. Abre **CampusConnect**
3. Busca variable `token`
4. Pega el token ahí

---

## 📊 Flujo Visual Completo

```
╔════════════════════════════════════════════════════════╗
║ USUARIO NUEVO                                          ║
╚════════════════════════════════════════════════════════╝

         ↓

╔════════════════════════════════════════════════════════╗
║ 1. POST /api/auth/register                            ║
║    ├─ email: test@ejemplo.com                         ║
║    └─ password: Test123456!                           ║
╚════════════════════════════════════════════════════════╝
         │
         ├─→ MongoDB: isVerified = false ❌
         └─→ Email enviado con token ✉️

         ↓

╔════════════════════════════════════════════════════════╗
║ 2. USUARIO RECIBE EMAIL                               ║
║    └─ Copia el token del enlace                       ║
╚════════════════════════════════════════════════════════╝

         ↓

╔════════════════════════════════════════════════════════╗
║ 3. GET /api/auth/verify-email/TOKEN_AQUI              ║
╚════════════════════════════════════════════════════════╝
         │
         ├─→ MongoDB: isVerified = true ✅
         └─→ Token eliminado

         ↓

╔════════════════════════════════════════════════════════╗
║ 4. POST /api/auth/login                               ║
║    ├─ email: test@ejemplo.com                         ║
║    └─ password: Test123456!                           ║
╚════════════════════════════════════════════════════════╝
         │
         └─→ Recibes JWT token 🔐

         ↓

╔════════════════════════════════════════════════════════╗
║ ✅ USUARIO COMPLETAMENTE VERIFICADO Y AUTENTICADO    ║
╚════════════════════════════════════════════════════════╝
```

---

## 🎥 Checklist de Verificación

- [ ] Configuré `.env` con credenciales correctas
- [ ] Servidor está corriendo (`npm start`)
- [ ] MongoDB está corriendo
- [ ] Postman está abierto
- [ ] Hice POST `/api/auth/register` ✅
- [ ] Recibí el email de verificación ✅
- [ ] Copié el token del email ✅
- [ ] Hice GET `/api/auth/verify-email/TOKEN` ✅
- [ ] Recibí respuesta con `isVerified: true` ✅
- [ ] Verifiqué en MongoDB que cambió a `true` ✅
- [ ] Hice login exitosamente ✅

---

## ❌ Troubleshooting

### "No recibí el email"

```
❌ Causa: Credenciales de Gmail incorrectas
✅ Solución:
   1. Verifica EMAIL_USER en .env
   2. Verifica EMAIL_PASS es contraseña de app (no contraseña normal)
   3. Ve a: https://myaccount.google.com/apppasswords
   4. Genera una nueva contraseña de 16 caracteres
```

### "Token inválido o expirado"

```
❌ Causa: Token expiró (>24h) o token incorrecto
✅ Solución:
   1. Copia bien el token completo (sin espacios)
   2. Usa dentro de 24 horas
   3. Si ya pasó, regístrate de nuevo
```

### "Status 500 - Server error"

```
❌ Causa: Error en el servidor
✅ Solución:
   1. Mira la terminal donde corre `npm start`
   2. Verifica que MongoDB esté corriendo
   3. Verifica que el .env esté bien configurado
   4. Reinicia el servidor
```

---

¡Felicidades! Ahora dominas el flujo de verificación. 🎉
