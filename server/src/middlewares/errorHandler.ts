// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config';
import httpStatus from 'http-status-codes';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (err: AppError,req: Request,res: Response,next: NextFunction) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong';

  logger.error(`error // method:${req.method} - status:${statusCode} - path:${req.originalUrl} //`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
