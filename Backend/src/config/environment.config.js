// Las variables de entorno se cargan en server.js
// Aquí solo las leemos desde process.env

export const ENVIRONMENT = {
  port: process.env.PORT || 3000,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  disableEmailVerification: process.env.DISABLE_EMAIL_VERIFICATION === 'true',
  nodeEnv: process.env.NODE_ENV || 'development',
};
