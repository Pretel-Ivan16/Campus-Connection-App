import dns from 'dns';
import nodemailer from 'nodemailer';
import { ENVIRONMENT } from '../config/environment.config.js';

const SMTP_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.EMAIL_PORT || 587);
const SMTP_SECURE = process.env.EMAIL_SECURE === 'true' || SMTP_PORT === 465;
const EMAIL_CONNECTION_TIMEOUT_MS = Number(process.env.EMAIL_CONNECTION_TIMEOUT_MS || 10000);
const EMAIL_GREETING_TIMEOUT_MS = Number(process.env.EMAIL_GREETING_TIMEOUT_MS || 10000);
const EMAIL_SOCKET_TIMEOUT_MS = Number(process.env.EMAIL_SOCKET_TIMEOUT_MS || 10000);
const EMAIL_SEND_TIMEOUT_MS = Number(process.env.EMAIL_SEND_TIMEOUT_MS || 12000);
const EMAIL_SEND_RETRIES = Number(process.env.EMAIL_SEND_RETRIES || 2);

if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

// Validar que existan credenciales
if (!ENVIRONMENT.emailUser || !ENVIRONMENT.emailPass) {
  console.error('❌ ERROR: Faltan credenciales de email en .env');
  console.error('   EMAIL_USER:', ENVIRONMENT.emailUser ? '✅ Configurado' : '❌ No configurado');
  console.error('   EMAIL_PASS:', ENVIRONMENT.emailPass ? '✅ Configurado' : '❌ No configurado');
  console.error('   Verifica que tu archivo .env esté en: Backend/.env');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableEmailError = (error) => {
  const retryableCodes = new Set(['ESOCKET', 'ETIMEDOUT', 'ECONNECTION', 'EAI_AGAIN', 'ENETUNREACH']);
  const message = String(error?.message || '').toLowerCase();
  return retryableCodes.has(error?.code) || message.includes('timeout') || message.includes('enetunreach');
};

const createTransporter = async (forceResolvedIpv4 = false) => {
  const transportOptions = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    family: 4,
    connectionTimeout: EMAIL_CONNECTION_TIMEOUT_MS,
    greetingTimeout: EMAIL_GREETING_TIMEOUT_MS,
    socketTimeout: EMAIL_SOCKET_TIMEOUT_MS,
    auth: {
      user: ENVIRONMENT.emailUser,
      pass: ENVIRONMENT.emailPass,
    },
  };

  if (forceResolvedIpv4) {
    try {
      const ipv4Results = await dns.promises.resolve4(SMTP_HOST);
      if (ipv4Results.length > 0) {
        transportOptions.host = ipv4Results[0];
        // Usamos SNI para que TLS valide contra el hostname real y no la IP.
        transportOptions.tls = { servername: SMTP_HOST };
      }
    } catch (dnsError) {
      console.warn(`[EMAIL WARN] No se pudo resolver IPv4 para ${SMTP_HOST}: ${dnsError.message}`);
    }
  }

  return nodemailer.createTransport(transportOptions);
};

const sendMailWithTimeout = async (mailOptions, forceResolvedIpv4 = false) => {
  const transporter = await createTransporter(forceResolvedIpv4);
  let timeoutId;

  try {
    return await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`Email send timed out after ${EMAIL_SEND_TIMEOUT_MS}ms`));
        }, EMAIL_SEND_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

const sendMailWithRetry = async (mailOptions) => {
  let lastError;

  for (let attempt = 0; attempt <= EMAIL_SEND_RETRIES; attempt += 1) {
    const useIpv4Fallback = attempt > 0;
    try {
      return await sendMailWithTimeout(mailOptions, useIpv4Fallback);
    } catch (error) {
      lastError = error;
      const canRetry = attempt < EMAIL_SEND_RETRIES && isRetryableEmailError(error);
      if (!canRetry) {
        throw error;
      }

      const nextAttempt = attempt + 2;
      console.warn(`[EMAIL WARN] Intento ${attempt + 1} fallido (${error.code || 'NO_CODE'}). Reintentando (${nextAttempt}/${EMAIL_SEND_RETRIES + 1})...`);
      await sleep(400 * (attempt + 1));
    }
  }

  throw lastError;
};

export const sendVerificationEmail = async (
  email,
  verificationToken,
  frontendUrl = ENVIRONMENT.frontendUrl || 'http://localhost:5173'
) => {
  try {
    if (!email || !verificationToken) {
      throw new Error('Email and verificationToken are required');
    }

    const verificationLink = `${frontendUrl}/verify-email/${verificationToken}`;

    const mailOptions = {
      from: ENVIRONMENT.emailUser,
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

    console.log('\n📧 Intentando enviar email...');
    console.log('   De:', ENVIRONMENT.emailUser);
    console.log('   Para:', email);
    console.log('   Asunto:', mailOptions.subject);
    
    const info = await sendMailWithRetry(mailOptions);
    
    console.log('✅ Email enviado exitosamente!');
    console.log('   ID:', info.messageId);
    console.log('   Response:', info.response);
  } catch (error) {
    console.error('❌ Error enviando email:');
    console.error('   Mensaje:', error.message);
    console.error('   Code:', error.code);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendEmail = async (email, subject, htmlContent) => {
  try {
    if (!email || !subject || !htmlContent) {
      throw new Error('Email, subject and htmlContent are required');
    }

    const mailOptions = {
      from: ENVIRONMENT.emailUser,
      to: email,
      subject,
      html: htmlContent,
    };

    await sendMailWithRetry(mailOptions);
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

export const sendPasswordRecoveryEmail = async (
  email,
  recoveryToken,
  frontendUrl = ENVIRONMENT.frontendUrl || 'http://localhost:5173'
) => {
  try {
    if (!email || !recoveryToken) {
      throw new Error('Email and recoveryToken are required');
    }

    const resetLink = `${frontendUrl}/reset-password/${recoveryToken}`;

    const mailOptions = {
      from: ENVIRONMENT.emailUser,
      to: email,
      subject: 'Recuperar contraseña - CampusConnect',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Recupera tu contraseña</h2>
          <p style="color: #666; font-size: 16px;">Hola,</p>
          <p style="color: #666; font-size: 16px;">
            Recibimos una solicitud para recuperar tu contraseña. 
            Si no fuiste tú, puedes ignorar este email de forma segura.
          </p>
          <p style="color: #666; font-size: 16px;">
            Para establecer una nueva contraseña, haz clic en el siguiente enlace:
          </p>
          <a href="${resetLink}" 
            style="display: inline-block; margin: 20px 0; padding: 12px 30px; 
                    background-color: #007bff; color: white; text-decoration: none; 
                    border-radius: 5px; font-weight: bold;">
            Recuperar Contraseña
          </a>
          <p style="color: #999; font-size: 14px;">
            O copia y pega este enlace en tu navegador:
          </p>
          <p style="color: #999; font-size: 14px; word-break: break-all;">
            ${resetLink}
          </p>
          <p style="color: #999; font-size: 14px;">
            Este enlace expirará en 1 hora.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">
            Si no solicitaste recuperar tu contraseña, por favor ignora este email.
          </p>
        </div>
      `,
    };

    console.log('\n📧 Intentando enviar email de recuperación de contraseña...');
    console.log('   De:', ENVIRONMENT.emailUser);
    console.log('   Para:', email);
    console.log('   Asunto:', mailOptions.subject);
    
    const info = await sendMailWithRetry(mailOptions);
    
    console.log('✅ Email de recuperación enviado exitosamente!');
    console.log('   ID:', info.messageId);
    console.log('   Response:', info.response);
  } catch (error) {
    console.error('❌ Error enviando email de recuperación:');
    console.error('   Mensaje:', error.message);
    console.error('   Code:', error.code);
    throw new Error(`Error sending password recovery email: ${error.message}`);
  }
};

export const verifyEmailConnection = async () => {
  try {
    if (!ENVIRONMENT.emailUser || !ENVIRONMENT.emailPass) {
      throw new Error('Email credentials are not configured');
    }

    const transporter = await createTransporter(false);
    try {
      await transporter.verify();
    } catch (firstError) {
      if (!isRetryableEmailError(firstError)) {
        throw firstError;
      }

      const fallbackTransporter = await createTransporter(true);
      await fallbackTransporter.verify();
    }
    console.log('Email service is ready');
    return true;
  } catch (error) {
    console.error('Email service error:', error.message);
    return false;
  }
};
