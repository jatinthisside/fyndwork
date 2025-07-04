import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hashPassword, sendEmail } from "../helpers";
import { generateOTP } from "../utils";
import { redisClient, logger } from "../config";
import { JWT_SECRET, JWT_EXPIRES,NODE_ENV } from '../config';
import { compressImage, uploadToCloud } from "../helpers";

export const signup = async (req: Request, res: Response, next:NextFunction) : Promise<any> => {
  try {
    const {email,name,role,password,about,city,state,country,pincode,street} = req.body;

    if(!name || !email || !role || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Name, email, role and password are required fields",
      });
    }

    if(role === 'company') {
      if(!about || !city || !state || !country || !pincode || !street) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "all fields are required for company",
        });
      }
    }

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success:false,
        message: "User already exists with this email",
      });
    }

    const isVerified = await redisClient.get(`verified:${email}`);
    if (!isVerified) return res.status(403).json({ message: 'Email not verified' });

    // hash password
    const hashedPassword = await hashPassword(password);

    let image_url = `https://avatar.iran.liara.run/username?username=${name}`;
    if(req.file){
       const resizedImage = await compressImage(req.file.buffer);
       const savedImage = await uploadToCloud(resizedImage, "fyndwork/profile", "image");
       image_url = savedImage.secure_url;
    }

    const user = await User.create({
      email,
      name,
      role,
      password:hashedPassword,
      about,
      city,
      state,
      country,
      pincode,
      street,
      profile_photo: image_url
    });

    await redisClient.del(`verified:${email}`); // Clean up
    
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          profile_photo: image_url
        },
    });

  } catch (error: any) {
    logger.error(`Error during signup: ${error.message}`);
    next(error);
  }
};

export const signin = async (req: Request, res: Response, next:NextFunction) : Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ sucess:false, message: 'User with email not exits' });
    }

    if(!user.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ sucess:false, message: 'user wont have any password!' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    if(!JWT_SECRET || !JWT_EXPIRES) {
      throw new Error('JWT_SECRET or JWT_EXPIRES is not defined in environment variables');
    }

    const payload = {
      user_id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    }

   // Sign JWT
   const token = jwt.sign(payload, JWT_SECRET, {
     expiresIn: "24hr", // Token will expire in 24 hours
     algorithm: 'HS256',
   });

    // Set cookie
    res
      .cookie('token', token, {
        httpOnly: NODE_ENV !== 'production', // Set httpOnly to true in production
        secure: NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hr
      })
      .status(StatusCodes.OK)
      .json({success:true, message: 'Login successful', user: { id: user._id, email: user.email, role: user.role } });
  } catch (error: any) {
    logger.error(`Error during signup: ${error.message}`);
    next(error);
  }
};

export const sendOtp = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
        const { email } = req.body;
        logger.info(`requested for otp : ${email}`);
        const otpAlreadyExist = await redisClient.get(`otp:${email}`);
        if(otpAlreadyExist){
           return res.status(StatusCodes.CONFLICT).json({
            success:false,
            message:"your requested otp is still active, use that or request after 5 min"
           })
        }
        const otp = generateOTP();
        await redisClient.setEx(`otp:${email}`, 300, otp); // expires in 5 min
        await sendEmail(email, 'Your OTP Code', `Your code is: ${otp}`);
        logger.info(`otp : ${otp} `);
        res.status(StatusCodes.ACCEPTED).json({ success:true, message: 'OTP sent successfully' });
    } catch (error: any) {
        logger.error(`Error during signup: ${error.message}`);
        next(error);
    }
}

export const verifyOtp = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
      const { email, otp } = req.body;
      const storedOtp = await redisClient.get(`otp:${email}`);
      if (storedOtp == otp) {
        await redisClient.setEx(`verified:${email}`, 600, 'true'); //expires in 10 min
        res.status(200).json({success:true, message: 'Email verified. You can now signup.' });
      } else {
         res.status(StatusCodes.ACCEPTED).json({success:false, message: 'Invalid or expired OTP' });
      }
    } catch (error: any) {
        logger.error(`Error during signup: ${error.message}`);
        next(error);
    }
}


