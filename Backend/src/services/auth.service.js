import User from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken, generateVerificationToken, verifyToken } from '../utils/jwt.js';
import { sendVerificationEmail } from '../utils/email.js';

export const registerUser = async (email, password, frontendUrl = 'http://localhost:3000') => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Validar que email no exista
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Generar token de verificación
    const verificationToken = generateVerificationToken(email);

    // Crear usuario
    const newUser = new User({
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    await newUser.save();

    // Enviar email de verificación
    await sendVerificationEmail(email, verificationToken, frontendUrl);

    // Devolver usuario sin password
    return {
      userId: newUser._id,
      email: newUser.email,
      isVerified: newUser.isVerified,
      message: 'User registered successfully. Check your email to verify your account.',
    };
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

export const verifyUserEmail = async (token) => {
  try {
    if (!token) {
      throw new Error('Verification token is required');
    }

    // Verificar y decodificar el token
    const decoded = verifyToken(token);

    // Buscar usuario por email (del payload del token)
    const user = await User.findOne({ email: decoded.userId, verificationToken: token }).select(
      '+verificationToken'
    );

    if (!user) {
      throw new Error('Invalid or expired verification token');
    }

    // Marcar usuario como verificado
    user.isVerified = true;
    user.verificationToken = undefined; // Eliminar el token

    await user.save();

    return {
      userId: user._id,
      email: user.email,
      isVerified: user.isVerified,
      message: 'Email verified successfully',
    };
  } catch (error) {
    throw new Error(`Error verifying email: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Buscar usuario y obtener password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verificar contraseña
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Verificar que el usuario haya verificado su email
    if (!user.isVerified) {
      throw new Error('Please verify your email before logging in');
    }

    // Generar JWT
    const token = generateToken({ userId: user._id, email: user.email }, '24h');

    return {
      token,
      userId: user._id,
      email: user.email,
      message: 'Login successful',
    };
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

export const getUserById = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: user._id,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw new Error(`Error getting user: ${error.message}`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: user._id,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw new Error(`Error getting user: ${error.message}`);
  }
};
