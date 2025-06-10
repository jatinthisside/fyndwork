import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10min
  max: 50, // Limit each IP to 50 requests per windowMs
  message: { message: 'Too many requests, please try again later.' },
});

export const otpRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  max: 3, // 3 OTP requests per window
  message: 'Too many OTP requests, try again later',
});