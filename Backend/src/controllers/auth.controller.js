import { registerUser, verifyUserEmail, loginUser, getUserById, recoverPassword, resetPassword, resendVerificationEmail } from '../services/auth.service.js';

/*

 * Controller para registrar un nuevo usuario
 * POST /auth/register
 * Body: { email, password, name }

*/
export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Validar inputs
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
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

    // Obtener URL del frontend (puede venir en el body, headers, o usar default)
    const frontendUrl = req.body.frontendUrl || req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

    // Registrar usuario
    const result = await registerUser(email, password, name, frontendUrl);
    const statusCode = result.statusCode || 201;
    const { statusCode: _ignoredStatusCode, ...responseData } = result;

    res.status(statusCode).json({
      success: true,
      data: responseData,
      message: responseData.message,
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

/*

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
    // Errores específicos - clasificar mejor
    const errorMsg = error.message || '';
    
    if (errorMsg.includes('Invalid') || errorMsg.includes('expired') || errorMsg.includes('Token has expired') || errorMsg.includes('Invalid token')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    if (errorMsg.includes('User not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Error genérico
    res.status(500).json({
      success: false,
      message: errorMsg || 'Error verifying email',
    });
  }
};

/*

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

/*

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

/*

 * Controller para solicitar recuperación de contraseña
 * POST /auth/recover-password
 * Body: { email, frontendUrl (opcional) }

*/
export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const frontendUrl = req.body.frontendUrl || req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';
    const result = await resendVerificationEmail(email, frontendUrl);
    res.status(200).json({ success: true, data: result, message: result.message });
  } catch (error) {
    if (error.message.includes('already verified')) {
      return res.status(409).json({ success: false, message: 'Email is already verified' });
    }
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(500).json({ success: false, message: error.message || 'Error resending verification email' });
  }
};

export const requestPasswordRecovery = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validar email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
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

    // Obtener URL del frontend
    const frontendUrl = req.body.frontendUrl || process.env.FRONTEND_URL || 'http://localhost:3000';

    // Solicitar recuperación de contraseña
    const result = await recoverPassword(email, frontendUrl);

    res.status(200).json({
      success: true,
      data: result,
      message: result.message,
    });
  } catch (error) {
    // Por seguridad, no revelar si el email existe o no
    // Devolver respuesta exitosa en ambos casos
    console.error('Password recovery error:', error.message);

    res.status(200).json({
      success: true,
      data: {
        message: 'If the email exists, you will receive a password recovery link',
      },
      message: 'If the email exists, you will receive a password recovery link',
    });
  }
};

/*

 * Controller para resetear la contraseña
 * POST /auth/reset-password
 * Body: { token, newPassword }

*/
export const resetUserPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    // Validar inputs
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required',
      });
    }

    // Validar longitud de contraseña
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Resetear contraseña
    const result = await resetPassword(token, newPassword);

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
        message: 'Invalid or expired reset token',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error resetting password',
    });
  }
};
