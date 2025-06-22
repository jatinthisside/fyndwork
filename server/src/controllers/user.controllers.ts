import { Request, Response, NextFunction } from 'express';
import { StudentProfile } from "../models";
import { toObjectId } from "../utils";
import { IStudentProfile } from "../types";
import { StatusCodes } from 'http-status-codes';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Just a stub for now — connect to Mongo later
    res.status(200).json({ message: 'All users fetched successfully' });
  } catch (err) {
    next(err);
  }
};

export const setupStudentProfile=async(req: Request | any, res: Request | any)=>{
  try {
    const userId = req.user!.user_id;

    const { skills, portfolio, resume, dob } = req.body;

    const profileData: Partial<IStudentProfile> = {
      user: toObjectId(userId),
      skills: skills,
      portfolio: portfolio,
      resume: resume,
      dob: dob,
    };

    const profile = await StudentProfile.findOneAndUpdate(
      { user: userId },
      profileData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: 'Student profile updated successfully',
      profile
    });
  } catch (error:any) {
     throw new Error(error.message || 'Error setting up student profile');
  }
}