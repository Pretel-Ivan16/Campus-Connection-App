import nodemailer from 'nodemailer';
import { ENVIRONMENT } from '../config/environment.config.js';

// Crear transporte de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENVIRONMENT.emailUser,
    pass: ENVIRONMENT.emailPass,
  },
});

/**
 * Envía un email de verificación con el token al usuario
 * @param {string} email - Correo electrónico del usuario
 * @param {string} verificationToken - Token de verificación
 * @param {string} frontendUrl - URL del frontend para construir link de verificación
 * @returns {Promise<void>} - Promesa que se resuelve cuando se envía el email
 * @throws {Error} - Si ocurre un error al enviar el email
 */
export const sendVerificationEmail = async (
  email,
  verificationToken,
  frontendUrl = 'http://localhost:3000'
) => {
  try {
    if (!email || !verificationToken) {
      throw new Error('Email and verificationToken are required');
    }

    const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: 'Verifica tu correo electrónico - CampusConnect',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">¡Bienvenido a CampusConnect!</h2>
          <p style="color: #666; font-size: 16px;">Hola,</p>
          <p style="color: #666; font-size: 16px;">
            Gracias por registrarte en CampusConnect. Para completar tu registro, 
            por favor verifica tu correo electrónico haciendo clic en el siguiente enlace:
          </p>
          <a href="${verificationLink}" 
            style="display: inline-block; margin: 20px 0; padding: 12px 30px; 
                    background-color: #007bff; color: white; text-decoration: none; 
                    border-radius: 5px; font-weight: bold;">
            Verificar Email
          </a>
          <p style="color: #999; font-size: 14px;">
            O copia y pega este enlace en tu navegador:
          </p>
          <p style="color: #999; font-size: 14px; word-break: break-all;">
            ${verificationLink}
          </p>
          <p style="color: #999; font-size: 14px;">
            Este enlace expirará en 24 horas.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">
            Si no te registraste en CampusConnect, por favor ignora este email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

/**
 * Envía un email genérico al usuario
 * @param {string} email - Correo electrónico del destinatario
 * @param {string} subject - Asunto del email
 * @param {string} htmlContent - Contenido HTML del email
 * @returns {Promise<void>} - Promesa que se resuelve cuando se envía el email
 * @throws {Error} - Si ocurre un error al enviar el email
 */
export const sendEmail = async (email, subject, htmlContent) => {
  try {
    if (!email || !subject || !htmlContent) {
      throw new Error('Email, subject and htmlContent are required');
    }

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

/**
 * Verifica que el transporte de email esté configurado correctamente
 * @returns {Promise<boolean>} - Devuelve true si la conexión es exitosa
 */
export const verifyEmailConnection = async () => {
  try {
    if (!config.emailUser || !config.emailPass) {
      throw new Error('Email credentials are not configured');
    }

    await transporter.verify();
    console.log('Email service is ready');
    return true;
  } catch (error) {
    console.error('Email service error:', error.message);
    return false;
  }
};
