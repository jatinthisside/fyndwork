import { createClient } from 'redis';
import { REDIS_URL } from './env';
import { logger } from './logger';

logger.info(`redis url: ${REDIS_URL}`);

export const redisClient = createClient({
  url: REDIS_URL
});

redisClient.on('error', (err) => logger.error(`❌ Redis error: ${err.message}`,));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('✅ Redis connected');
  }
};

