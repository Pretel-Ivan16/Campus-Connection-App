import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Rutas de Autenticación
 * Prefijo: /auth
 */

/**
 * POST /auth/register
 * Registra un nuevo usuario con verificación de email
 *
 * Body:
 * {
 *   email: string (requerido)
 *   password: string (requerido, mín 6 caracteres)
 *   frontendUrl: string (opcional, default: http://localhost:3000)
 * }
 *
 * Response: 201
 * {
 *   success: true,
 *   data: { userId, email, isVerified },
 *   message: "User registered successfully..."
 * }
 *
 * Errors:
 * - 400: Email/password missing or invalid format
 * - 409: Email already registered
 * - 500: Server error
 */
router.post("/register", authController.register);

/*

GET /auth/verify-email/:token
  Verifica el email del usuario usando el token de verificación

Params:
  - token: string (JWT de verificación, válido por 24 horas)

  Response: 200
  {
    success: true,
    data: { userId, email, isVerified },
    message: "Email verified successfully..."
  }

Errors:
  - 400: Token missing
  - 401: Invalid or expired token
  - 500: Server error
*/
router.get("/verify-email/:token", authController.verifyEmail);

/*

POST /auth/login
  Autentica un usuario y devuelve JWT de acceso

  Body:
  {
    email: string (requerido)
    password: string (requerido)
  }

  Response: 200
  {
    success: true,
    data: { token, userId, email },
    message: "Login successful"
  }

Errors:
  - 400: Email/password missing
  - 401: Invalid credentials
  - 403: Email not verified
  - 500: Server error

*/
router.post("/login", authController.login);

/*

GET /auth/profile
  Obtiene los datos del usuario autenticado

REQUIERE: Middleware de autenticación JWT

  Headers:
  Authorization: Bearer <token>

  Response: 200
  {
    success: true,
    data: { userId, email, isVerified, createdAt },
    message: "Profile retrieved successfully"
  }

Errors:
  - 401: Not authenticated or invalid token
  - 404: User not found
  - 500: Server error

 */
router.get("/profile", authMiddleware, authController.getProfile);

export default router;
