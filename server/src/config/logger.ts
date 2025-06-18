import winston from 'winston';
import 'winston-mongodb';
import dotenv from 'dotenv';
import { MONGO_URI } from './env';
dotenv.config();

// Add colors for each level
const logColors: Record<string, string> = {
  error: '\x1b[31m',  // red
  warn: '\x1b[33m',   // yellow
  info: '\x1b[36m',   // cyan
  http: '\x1b[35m',   // magenta
  debug: '\x1b[32m',  // green
};

const resetColor = '\x1b[0m';

// Format: [TIME] LEVEL - message
const consoleFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
  const color = logColors[level] || '';
  const metaString = Object.keys(meta).length ? ` | ${JSON.stringify(meta)}` : '';
  return `${color}[${timestamp}] ${level.toUpperCase()} - ${message}${metaString}${resetColor}\n`;
});

export const logger = winston.createLogger({
  level: 'debug', // log http and above (http, info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat()
  ),
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.MongoDB({
      level: 'http',
      db: MONGO_URI,
      collection: 'logs',
      tryReconnect: true,
      metaKey: 'meta',
    }),
  ],
});
