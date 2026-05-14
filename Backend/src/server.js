// Asegurar que crypto está disponible desde el inicio (Mongoose 9.2.1 requirement)
import crypto from 'crypto';
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
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
