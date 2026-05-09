# 🎯 Quick Start - Verificación en Postman

## 5 Pasos Simples

### 1️⃣ Configura tu `.env`

En la carpeta `Backend/`, crea o edita `.env`:

```env
PORT=8080
MONGODB_URL=mongodb://localhost:27017/campus-connect
JWT_SECRET=mi_secreto_super_seguro_123456789
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_app_de_gmail_16_caracteres
FRONTEND_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:**

- `EMAIL_USER`: Tu email de Gmail real (ej: juan.perez@gmail.com)
- `EMAIL_PASS`: **NO es tu contraseña normal**. Es una contraseña de 16 caracteres generada por Google
- [Ver cómo obtener contraseña de app](https://support.google.com/accounts/answer/185833)

---

### 2️⃣ Inicia el Servidor

En terminal (en la carpeta `Backend/`):

```bash
npm start
```

Deberías ver:

```
Server running on port 8080
```

---

### 3️⃣ En Postman - REGISTRO

**Nueva request:**

- **Method**: `POST`
- **URL**: `http://localhost:8080/api/auth/register`
- **Headers**: `Content-Type: application/json`

**Body (raw JSON):**

```json
{
  "email": "tu_correo_real@gmail.com",
  "password": "Password123!",
  "frontendUrl": "http://localhost:3000"
}
```

**Click SEND**

✅ Deberías recibir:

```json
{
  "success": true,
  "data": {
    "userId": "...",
    "email": "tu_correo_real@gmail.com",
    "isVerified": false
  }
}
```

---

### 4️⃣ Abre tu Email

📧 Ve a tu bandeja de Gmail y busca el email de CampusConnect

Verás un botón **"Verificar Email"** o un enlace como:

```
http://localhost:3000/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Copia el token** (la parte larga después de `token=`)

---

### 5️⃣ En Postman - VERIFICACIÓN

**Nueva request:**

- **Method**: `GET`
- **URL**: `http://localhost:8080/api/auth/verify-email/PEGA_EL_TOKEN_AQUI`

Reemplaza `PEGA_EL_TOKEN_AQUI` con el token que copiaste.

**Click SEND**

✅ Deberías recibir:

```json
{
  "success": true,
  "data": {
    "userId": "...",
    "email": "tu_correo_real@gmail.com",
    "isVerified": true,
    "message": "Email verified successfully"
  }
}
```

---

## 🎉 ¡Lo lograste!

Tu usuario ahora tiene `isVerified: true` en la BDD.

### Ahora puedes hacer LOGIN:

**Nueva request:**

- **Method**: `POST`
- **URL**: `http://localhost:8080/api/auth/login`

**Body:**

```json
{
  "email": "tu_correo_real@gmail.com",
  "password": "Password123!"
}
```

**Click SEND**

Recibirás un `token` JWT que puedes usar para acceder a endpoints protegidos.

---

## 🔍 Verifica en MongoDB

Para ver el cambio de `isVerified` en la BDD:

1. Abre **MongoDB Compass**
2. Conecta a: `mongodb://localhost:27017`
3. Ve a BD: `campus-connect` → Colección: `users`
4. Busca tu email
5. Verás:
   - Antes: `"isVerified": false`
   - Después: `"isVerified": true` ✅

---

## 📊 Estado de BDD en cada paso

```
┌─────────────────────────────────────────────────┐
│ Paso 1: REGISTER                                │
│ isVerified: false ❌                             │
│ verificationToken: "eyJhbGc..." ✅              │
│ password: "$2b$10$..." (hasheada)               │
└─────────────────────────────────────────────────┘
                    ↓
        📧 Email enviado con token
                    ↓
┌─────────────────────────────────────────────────┐
│ Paso 2: VERIFY EMAIL (con token del email)      │
│ isVerified: true ✅                              │
│ verificationToken: null                         │
│ password: "$2b$10$..." (hasheada)               │
└─────────────────────────────────────────────────┘
                    ↓
        ✅ Usuario listo para LOGIN
```

---

## ❌ Si algo falla...

### "No recibí el email"

- Revisa spam
- Verifica `EMAIL_USER` y `EMAIL_PASS` en `.env`
- Asegúrate de haber generado contraseña de app (no contraseña normal)

### "Token inválido o expirado"

- El token expira en 24 horas
- Regístrate de nuevo
- Verifica dentro de 24h

### "Invalid email or password" (en login)

- Verifica que el email sea exactamente igual
- La contraseña es sensible a mayúsculas/minúsculas
- Asegúrate de haber verificado el email primero

### "Server error"

- Verifica que MongoDB esté corriendo
- Revisa que el `.env` esté bien configurado
- Mira los logs del servidor (terminal)

---

¡Listo! Ya sabes cómo hacer el flujo completo de registro, verificación y login. 🚀
