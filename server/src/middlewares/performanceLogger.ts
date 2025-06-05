// src/middlewares/performanceLogger.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config'; 

export const performanceLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.http(`${req.method} ${req.originalUrl}`, {
      statusCode: res.statusCode,
      responseTime: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
};
