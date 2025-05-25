import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
};
