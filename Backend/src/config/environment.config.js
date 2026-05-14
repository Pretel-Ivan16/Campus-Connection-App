// En desarrollo, carga desde .env local
// En producción (Railway), usa las variables de entorno del sistema
if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(({ default: dotenv }) => {
    dotenv.config();
  }).catch(() => {
    // dotenv no disponible, usar process.env directamente
  });
}

export const ENVIRONMENT = {
  port: process.env.PORT || 3000,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};
