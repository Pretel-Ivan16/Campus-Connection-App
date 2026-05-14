import crypto from 'crypto';
import mongoose from 'mongoose';
import { ENVIRONMENT } from './environment.config.js';

export const connectDB = async () => {
  try {
    if (!ENVIRONMENT.mongodbUrl) {
      throw new Error('MONGODB_URL is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(ENVIRONMENT.mongodbUrl, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
