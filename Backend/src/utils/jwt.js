import jwt from 'jsonwebtoken';
import { config } from '../config/environment.config.js';

/**
 * Genera un JWT con el payload y expiración especificada
 * @param {object} payload - Datos a incluir en el token (generalmente { userId, email })
 * @param {string} expiresIn - Tiempo de expiración (default: '24h')
 * @returns {string} - Token JWT firmado
 * @throws {Error} - Si ocurre un error durante la generación
 */
export const generateToken = (payload, expiresIn = '24h') => {
  try {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Payload must be an object');
    }

    if (!config.jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn });
    return token;
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

/**
 * Verifica y decodifica un JWT
 * @param {string} token - Token JWT a verificar (puede incluir "Bearer " al inicio)
 * @returns {object} - Payload decodificado del token
 * @throws {Error} - Si el token es inválido o expiró
 */
export const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }

    if (!config.jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Remover "Bearer " si está presente
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    const decoded = jwt.verify(cleanToken, config.jwtSecret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw new Error(`Error verifying token: ${error.message}`);
  }
};

/**
 * Genera un token de verificación de email con expiración corta
 * @param {string} userId - ID del usuario
 * @returns {string} - Token de verificación
 */
export const generateVerificationToken = (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Token de verificación expira en 24 horas
    const token = generateToken({ userId, type: 'email-verification' }, '24h');
    return token;
  } catch (error) {
    throw new Error(`Error generating verification token: ${error.message}`);
  }
};
