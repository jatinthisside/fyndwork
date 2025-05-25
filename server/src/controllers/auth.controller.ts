import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  res.json({ msg: 'Register user' });
};