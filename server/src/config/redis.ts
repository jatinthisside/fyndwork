import { createClient } from 'redis';
import { REDIS_URL } from './env';

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => console.error('❌ Redis error:', err));
redisClient.on('connect', () => {
  console.log('✅ Connected to Redis');
});

