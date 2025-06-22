import { Request, Response, NextFunction } from 'express';
import { StudentProfile } from "../models";
import { toObjectId } from "../utils";
import { IStudentProfile } from "../types";
import { StatusCodes } from 'http-status-codes';
import { redisClient } from '../config';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Just a stub for now — connect to Mongo later
    res.status(200).json({ message: 'All users fetched successfully' });
  } catch (err) {
    next(err);
  }
};

export const setupStudentProfile=async(req: Request, res: Response):Promise<any>=>{
  try {
    const userId = req.user!.user_id;

    if(!userId) {
      return res.status(StatusCodes.FORBIDDEN).json({success:false, error: "Unauthorized - Invalid user token" });
    }

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

// Cache TTL (1 hour)
const PROFILE_CACHE_TTL = 60 * 60; 

export const getStudentProfile = async (req: Request, res: Response):Promise<any> => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(StatusCodes.FORBIDDEN).json({success:false, error: "Unauthorized - Invalid user token" });
    }

    const userId = req.user._id;
    const cacheKey = `profile:${userId}`;

    const cachedProfile = await redisClient.get(cacheKey);
    if (cachedProfile) {
      return res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "User Profile fetched!",
        data:JSON.parse(cachedProfile)
      });
    }

    const profile = await StudentProfile.findOne({ user: userId })
      .populate({
        path: "user",
        select: "name email profile_photo role about city state country pincode street dob",
      })
      .populate({
        path: "education",
        select: "degree institution start_date end_date",
      })
      .populate({
        path: "certificates",
        select: "certificate_url issued_by issue_date",
        populate: {
          path: "issued_by",
          select: "name",
        },
      })
      .populate({
        path: "saved_tasks applied_tasks completed_tasks",
      })
      .lean();

    if (!profile) {
      return res.status(StatusCodes.NOT_FOUND).json({success:false, error: "Profile not found" });
    }

    await redisClient.setEx(
      cacheKey,
      PROFILE_CACHE_TTL,
      JSON.stringify(profile)
    );

    res.status(StatusCodes.ACCEPTED).json({
      success:true,
      message:"User Profile fetched!",
      profile
    });
  } catch (error: any) {
    throw new Error(error.message)
  }
};