// Las variables de entorno son inyectadas por --env-file antes de que se cargue este módulo

import app from './app.js';
import { connectDB } from './config/mongoDB.config.js';
import { ENVIRONMENT } from './config/environment.config.js';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(ENVIRONMENT.port, () => {
      console.log(`✅ Server running on port ${ENVIRONMENT.port}`);
      if (ENVIRONMENT.disableEmailVerification) {
        console.warn('⚠️  Email verification is DISABLED (DISABLE_EMAIL_VERIFICATION=true)');
      } else {
        console.log('✅ Email verification is ENABLED');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
