import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const signup = async (req:Request, res:Response) => {
  try{

  }catch(error) {
    console.error('Error during signup:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
}

export const signin = async (req:Request, res:Response) => {
    try{
  
    }catch(error) {
      console.error('Error during signup:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }