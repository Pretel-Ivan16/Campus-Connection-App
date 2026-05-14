# 🎓 Campus Connection App

Plataforma de foro universitario para conectar estudiantes, compartir publicaciones y organizarlas por facultades.

| Tech         | Version                                     |
| ------------ | ------------------------------------------- |
| **Backend**  | Node.js 24.x, Express 5.2.1, MongoDB, JWT   |
| **Frontend** | React 19.2.6, TypeScript, Vite, TailwindCSS |

---

## 🎨 Paleta de Colores

**Tema Oscuro Moderno:**

```
Primario: #6483ff (Azul)     |  Fondo: #06070b (Negro)
Secundario: #0766ee          |  Texto: #eee (Blanco)
Acentos: #00949b, #615ed6    |  Bordes: #252933
Radio: 0.75rem (moderno)
Tipografía: EB Garamond + Inter
```

---

## ⚡ Inicio Rápido

```bash
# 1. Clonar
git clone <URL> && cd campus-connection-app

# 2. Instalar dependencias
npm install
cd Backend && npm install
cd ../Frontend && npm install && cd ..

# 3. Backend .env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:pass@cluster.mongodb.net/db
JWT_SECRET=tu_secreto_seguro
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu_email@gmail.com
MAIL_PASSWORD=tu_pass_app
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# 4. Frontend .env.local
VITE_API_URL=http://localhost:5000

# 5. Ejecutar (2 terminales)
# Terminal 1: cd Backend && npm run dev
# Terminal 2: cd Frontend && npm run dev
```

→ Backend: http://localhost:5000  
→ Frontend: http://localhost:5173

---

## 📝 APIs Principales

| Endpoint                        | Método     | Auth | Descripción            |
| ------------------------------- | ---------- | ---- | ---------------------- |
| `/api/auth/register`            | POST       | ❌   | Registrar usuario      |
| `/api/auth/login`               | POST       | ❌   | Iniciar sesión         |
| `/api/auth/verify-email/:token` | GET        | ❌   | Verificar email        |
| `/api/auth/profile`             | GET        | ✅   | Obtener perfil         |
| `/api/posts`                    | GET        | ❌   | Listar posts           |
| `/api/posts`                    | POST       | ✅   | Crear post             |
| `/api/posts/:id`                | PUT/DELETE | ✅   | Actualizar/Eliminar    |
| `/api/faculties`                | GET        | ❌   | Listar facultades      |
| `/api/faculties`                | POST       | ✅🔐 | Crear facultad (admin) |

---

## 📁 Estructura

```
Backend/src/
├── controllers/      # Lógica de negocio
├── services/         # Lógica de aplicación
├── repositories/     # Acceso a datos
├── models/           # Schemas MongoDB
├── middlewares/      # Auth, validación, errores
└── routes/           # Endpoints API

Frontend/src/
├── components/       # Componentes React
├── pages/            # Páginas principales
├── hooks/            # Custom hooks
├── context/          # Estado global (Auth)
├── services/         # HTTP calls
└── types/            # TypeScript types
```

---

## ✨ Características

✅ Autenticación JWT + verificación email  
✅ CRUD posts por facultad  
✅ Sistema de roles (user/admin)  
✅ Diseño responsivo (móvil-first)  
✅ Tema oscuro  
✅ Validación de formularios  
✅ Notificaciones toast  
✅ Arquitectura en capas

---

## 📧 Configurar Email (Gmail)

1. En [myaccount.google.com](https://myaccount.google.com)
2. Seguridad → Contraseñas de aplicación
3. Crear contraseña para aplicación (16 caracteres)
4. Usar en `MAIL_PASSWORD` del .env

---

## 📊 Modelos

**User**: email, password (hashed), rol, verificado  
**Post**: título, contenido, autor, facultad, timestamps  
**Faculty**: nombre, descripción, timestamps

---

## 🚀 Deployment Vercel (Automático)

```bash
# 1. Push a GitHub
git add .
git commit -m "Deploy a producción"
git push origin main

# 2. Vercel auto-deploya
# 3. URL: https://proyecto.vercel.app
```

---

## 📞 Soporte

- Reportar bugs en Issues
- Contactar al equipo de desarrollo
- Revisar logs con `pm2 logs`

---

**Última actualización**: 2024-01-15  
Desarrollado para UTN - Diplomatura en Desarrollo Web Full Stack
