import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {logger} from '../config';

dotenv.config();

export const connectToDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI as string);
    logger.info('Connected to MongoDB Atlas');
  } catch (err:any) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};
