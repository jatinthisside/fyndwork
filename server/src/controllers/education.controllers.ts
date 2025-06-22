import { Request, Response } from 'express';
import { StudentProfile, Education } from '../models';
import {redisClient} from '../config';
import { StatusCodes } from 'http-status-codes';

export const addEducation = async (req: Request, res: Response):Promise<any> => {
    try {
      const userId = req.user!.user_id;

      if(!userId || !req.user) {
        return res.status(StatusCodes.FORBIDDEN).json({success:false, error: 'Unauthorized - Invalid user token' });
      }

      const {institution, degree, grade, start_date, end_date} =  req.body;
  
      const education = new Education({
        user: userId,
        institution,
        degree,
        grade,
        start_date: new Date(start_date),
        end_date: new Date(end_date)
      });

      await education.save();
  
      // Add to student profile
      await StudentProfile.findOneAndUpdate(
        { user: userId },
        { $push: { education: education._id } }
      );
  
      await redisClient.del(`student:profile:${userId}`);
      res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: 'Education added successfully',
        education
    });
    } catch (error:any) {
      throw new Error(error.message || 'Error adding education');
    }
  };

  export const getEducations = async (req: Request, res: Response):Promise<any> => {
    try {
      const userId = req.user!.user_id;
      if(!userId || !req.user) {
        return res.status(StatusCodes.FORBIDDEN).json({success:false, error: 'Unauthorized - Invalid user token' });
      }
      const educations = await Education.find({ user: userId });
      if(!educations || educations.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'No educations found' });
      }
      res.status(StatusCodes.ACCEPTED).json({
        success:true,
        message: 'Educations fetched successfully',
        educations
      });
    } catch (error:any) {
       throw new Error(error.message || 'Error fetching educations');
    }
  };