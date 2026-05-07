import jwt from 'jsonwebtoken';
import { ENVIRONMENT } from '../config/environment.config.js';

export const generateToken = (payload, expiresIn = '24h') => {
  try {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Payload must be an object');
    }

    if (!ENVIRONMENT.jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(payload, ENVIRONMENT.jwtSecret, { expiresIn });
    return token;
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

export const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }

    if (!ENVIRONMENT.jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Remover "Bearer " si está presente
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    const decoded = jwt.verify(cleanToken, ENVIRONMENT.jwtSecret);
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
