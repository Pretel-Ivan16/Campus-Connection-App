import crypto from 'crypto';
import mongoose from 'mongoose';
import { ENVIRONMENT } from './environment.config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(ENVIRONMENT.mongodbUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
