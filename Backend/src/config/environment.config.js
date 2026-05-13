import dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT = {
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};
