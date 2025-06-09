import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateRequest = (schema: AnyZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      console.log('Validation error:', err.errors);  
      res.status(StatusCodes.BAD_REQUEST).json({ errors: err.errors });
    }
};