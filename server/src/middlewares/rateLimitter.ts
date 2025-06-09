import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10min
  max: 50, // Limit each IP to 50 requests per windowMs
  message: { message: 'Too many requests, please try again later.' },
});
