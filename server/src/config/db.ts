import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../config/logger';

dotenv.config();

export const connectToDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
  try {
    console.log('Connecting to MongoDB Atlas...', MONGO_URI);
    await mongoose.connect(MONGO_URI as string);
    logger.info('Connected to MongoDB Atlas');
  } catch (err) {
    logger.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};
