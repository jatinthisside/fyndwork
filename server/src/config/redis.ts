import { createClient } from 'redis';
import { REDIS_URL } from './env';
import { logger } from './logger';

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => logger.error('❌ Redis error:', err));

redisClient.on('connect', () => {
  logger.info('✅ Connected to Redis');
});

