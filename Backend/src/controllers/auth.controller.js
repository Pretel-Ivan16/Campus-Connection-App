import { registerUser, verifyUserEmail, loginUser, getUserById } from '../services/auth.service.js';

/**
 * Controller para registrar un nuevo usuario
 * POST /auth/register
 * Body: { email, password }
 */
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Validar formato de email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Obtener URL del frontend (puede venir en el body o usar default)
    const frontendUrl = req.body.frontendUrl || process.env.FRONTEND_URL || 'http://localhost:3000';

    // Registrar usuario
    const result = await registerUser(email, password, frontendUrl);

    res.status(201).json({
      success: true,
      data: result,
      message: result.message,
    });
  } catch (error) {
    // Errores específicos
    if (error.message.includes('already registered')) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error registering user',
    });
  }
};

/**
 * Controller para verificar email del usuario
 * GET /auth/verify-email/:token
 */
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Validar token
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required',
      });
    }

    // Verificar email
    const result = await verifyUserEmail(token);

    res.status(200).json({
      success: true,
      data: result,
      message: result.message,
    });
  } catch (error) {
    // Errores específicos
    if (error.message.includes('Invalid') || error.message.includes('expired')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error verifying email',
    });
  }
};

/**
 * Controller para login del usuario
 * POST /auth/login
 * Body: { email, password }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Login
    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      data: result,
      message: result.message,
    });
  } catch (error) {
    // Errores específicos
    if (error.message.includes('Invalid email or password')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (error.message.includes('verify your email')) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error logging in',
    });
  }
};

/**
 * Controller para obtener perfil del usuario autenticado
 * GET /auth/profile
 * Header: Authorization: Bearer <token>
 * Requiere autenticación
 */
export const getProfile = async (req, res, next) => {
  try {
    // El middleware de autenticación debe agregar req.user con el userId
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // Obtener datos del usuario
    const user = await getUserById(req.user.userId);

    res.status(200).json({
      success: true,
      data: user,
      message: 'Profile retrieved successfully',
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving profile',
    });
  }
};
