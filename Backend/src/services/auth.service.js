import User from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken, generateVerificationToken, verifyToken } from '../utils/jwt.js';
import { sendVerificationEmail, sendPasswordRecoveryEmail } from '../utils/email.js';
import { ENVIRONMENT } from '../config/environment.config.js';

export const registerUser = async (email, password, name, frontendUrl = ENVIRONMENT.frontendUrl || 'http://localhost:5173') => {
  try {
    if (!email || !password || !name) {
      throw new Error('Email, password, and name are required');
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

    // Verificar si existe algún admin en la base de datos
    const adminExists = await User.findOne({ role: 'admin' });
    const userRole = adminExists ? 'user' : 'admin'; // Si no hay admin, el primero es admin

    // Crear usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      role: userRole,
    });

    await newUser.save();

    const verificationUrl = `${frontendUrl}/verify-email/${verificationToken}`;
    console.log(`[VERIFY URL] ${verificationUrl}`);

    // Intentar enviar el email, pero no fallar el registro si el SMTP está caído
    try {
      await sendVerificationEmail(email, verificationToken, frontendUrl);
      console.log(`[EMAIL OK] Enviado a: ${email}`);
    } catch (emailError) {
      console.error(`[EMAIL WARN] No se pudo enviar el correo a ${email}: ${emailError.message}`);
    }

    // Devolver usuario sin password inmediatamente
    return {
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isVerified: newUser.isVerified,
      role: newUser.role,
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

    // Validar que el token sea un token de verificación
    if (decoded.type !== 'email-verification') {
      throw new Error('Invalid token type');
    }

    // El email está en el payload como userId
    const email = decoded.userId;

    // Buscar usuario por email
    const user = await User.findOne({ email }).select('+verificationToken');

    if (!user) {
      throw new Error('User not found');
    }

    // Verificar si el usuario ya está verificado
    if (user.isVerified) {
      return {
        userId: user._id,
        email: user.email,
        isVerified: user.isVerified,
        message: 'Email is already verified',
      };
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
    const token = generateToken({ userId: user._id, email: user.email, role: user.role }, '24h');

    return {
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
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
      role: user.role,
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

export const resendVerificationEmail = async (email, frontendUrl = 'http://localhost:5173') => {
  try {
    if (!email) throw new Error('Email is required');

    const user = await User.findOne({ email }).select('+verificationToken');
    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('Email is already verified');

    const newToken = generateVerificationToken(email);
    user.verificationToken = newToken;
    await user.save();

    const verificationUrl = `${frontendUrl}/verify-email/${newToken}`;
    console.log(`[VERIFY URL] ${verificationUrl}`);

    await sendVerificationEmail(email, newToken, frontendUrl);
    console.log(`[EMAIL OK] Reenviado a: ${email}`);

    return { message: 'Verification email resent successfully' };
  } catch (error) {
    throw new Error(`Error resending verification email: ${error.message}`);
  }
};

export const recoverPassword = async (email, frontendUrl = ENVIRONMENT.frontendUrl || 'http://localhost:5173') => {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    // Buscar usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Generar token de recuperación (válido por 1 hora)
    const recoveryToken = generateVerificationToken(email);

    // Guardar token de recuperación en el usuario
    user.passwordResetToken = recoveryToken;
    user.passwordResetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
    await user.save();

    // Intentar enviar el email, pero no romper la solicitud si el SMTP falla
    try {
      await sendPasswordRecoveryEmail(email, recoveryToken, frontendUrl);
    } catch (emailError) {
      console.error(`❌ Error enviando email de recuperación: ${emailError.message}`);
    }

    return {
      message: 'Password recovery email sent successfully. Check your inbox.',
    };
  } catch (error) {
    throw new Error(`Error recovering password: ${error.message}`);
  }
};

export const resetPassword = async (resetToken, newPassword) => {
  try {
    if (!resetToken || !newPassword) {
      throw new Error('Reset token and new password are required');
    }

    // Validar longitud de contraseña
    if (newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Verificar token
    const decoded = verifyToken(resetToken);

    // Buscar usuario con token válido
    const user = await User.findOne({
      email: decoded.userId,
      passwordResetToken: resetToken,
      passwordResetTokenExpiry: { $gt: Date.now() }, // Token no expirado
    }).select('+passwordResetToken');

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash de la nueva contraseña
    const hashedPassword = await hashPassword(newPassword);

    // Actualizar contraseña y limpiar tokens de recuperación
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    return {
      message: 'Password reset successfully',
    };
  } catch (error) {
    throw new Error(`Error resetting password: ${error.message}`);
  }
};
