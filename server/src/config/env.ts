import dotenv from 'dotenv';

dotenv.config();

// Exporting environment variables with default values if not set
export const {
  PORT = '3000',
  MONGO_URI = 'mongodb://localhost:27017/myapp',
  JWT_SECRET,
  JWT_EXPIRES,
  NODE_ENV = 'development',
  CLIENT_ORIGIN = 'http://localhost:3000',
  REDIS_URL = 'redis://localhost:6379',
} = process.env;


