# 🎯 VERIFICACIÓN EN POSTMAN - RESUMEN RÁPIDO

## ¿Qué quieres hacer?

Registrar un usuario en Postman → Recibir email → Verificar → Cambiar `isVerified` a `true` en BDD

## 3 Cosas que DEBES hacer PRIMERO

### 1. Crear archivo `.env` en Backend/

```env
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=contraseña_app_gmail_16_caracteres
PORT=8080
MONGODB_URL=mongodb://localhost:27017/campus-connect
JWT_SECRET=secreto_seguro_aqui
```

**⚠️ EMAIL_PASS:**

- No es tu contraseña normal de Gmail
- Es contraseña de 16 caracteres para apps
- [Obtenerla aquí](https://myaccount.google.com/apppasswords)

### 2. Iniciar MongoDB

```bash
mongod
```

### 3. Iniciar Servidor

```bash
cd Backend
npm start
```

---

## 📱 PASOS EN POSTMAN

### Paso 1: REGISTRARSE

```
POST http://localhost:8080/api/auth/register

Body:
{
  "email": "tumail@gmail.com",
  "password": "Pass123!"
}
```

✅ Respuesta: `isVerified: false`
📧 Se envía email

### Paso 2: ABRIR EMAIL

📧 Busca email de CampusConnect en Gmail
🔑 Copia el **TOKEN** del enlace

Ejemplo de enlace en email:

```
http://localhost:3000/verify-email?token=eyJhbGciOiJIUzI1NiI...
                                          ↑ COPIA ESTO
```

### Paso 3: VERIFICAR EN POSTMAN

```
GET http://localhost:8080/api/auth/verify-email/PEGA_TOKEN_AQUI
```

✅ Respuesta: `isVerified: true`

### Paso 4: VERIFICAR EN MONGODB

```
MongoDB Compass
→ campus-connect
→ users
→ Buscar tu email
→ Ver: isVerified: true ✅
```

---

## 📊 ANTES Y DESPUÉS

### ANTES (después de REGISTER)

```
MongoDB → users collection:
{
  email: "tumail@gmail.com",
  isVerified: false,        ❌
  verificationToken: "..."
}
```

### DESPUÉS (después de VERIFY EMAIL)

```
MongoDB → users collection:
{
  email: "tumail@gmail.com",
  isVerified: true,         ✅
  verificationToken: null
}
```

---

## ⚡ COMANDOS RÁPIDOS

### Si no recibiste email:

```bash
# Revisa en logs del servidor si salió error
# En la terminal donde corre "npm start"
```

### Si el token expiró:

```bash
# Regístrate de nuevo
POST /api/auth/register
```

### Ver todos tus usuarios en MongoDB:

```
MongoDB Compass → campus-connect → users → Ver todos
```

---

## ✅ CHECKLIST

- [ ] `.env` configurado con credenciales
- [ ] MongoDB corriendo
- [ ] Servidor corriendo (`npm start`)
- [ ] Registré usuario en Postman
- [ ] Recibí email de verificación
- [ ] Copié el token del email
- [ ] Verifiqué el token en Postman
- [ ] Veo `isVerified: true` en MongoDB

---

## 🚀 SIGUIENTES PASOS

Una vez verificado:

### LOGIN

```
POST /api/auth/login
{
  "email": "tumail@gmail.com",
  "password": "Pass123!"
}
```

Recibes un `token` JWT

### CREAR POSTS (con token)

```
POST /api/posts
Authorization: Bearer TOKEN_QUE_RECIBISTE
{
  "title": "Mi post",
  "content": "Contenido del post",
  "facultyId": "ID_DE_FACULTAD"
}
```

---

¿Preguntas? Mira:

- `QUICKSTART.md` - Paso a paso visual
- `VERIFICATION_GUIDE.md` - Guía completa
- `VERIFICATION_VISUAL.md` - Con screenshots mentales
- `POSTMAN_GUIDE.md` - Específicamente para Postman

---

**Resumen en 10 segundos:**

1. Registrarse en Postman
2. Abrir email y copiar token
3. Hacer GET con el token en Postman
4. Ver en MongoDB que `isVerified` cambió a `true` ✅
