import { Request, Response, NextFunction } from 'express';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Just a stub for now — connect to Mongo later
    res.status(200).json({ message: 'All users fetched successfully' });
  } catch (err) {
    next(err);
  }
};
