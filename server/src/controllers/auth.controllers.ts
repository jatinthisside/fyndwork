import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models";
import { hashPassword, sendEmail } from "../helpers";
import { generateOTP } from "../utils";
import { redisClient } from "../config";

export const signup = async (req: Request, res: Response) : Promise<any> => {
  try {
    const {email,name,role,password,about,city,state,country,pincode,street} = req.body;
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already exists with this email",
      });
    }

    const isVerified = await redisClient.get(`verified:${email}`);
    if (!isVerified) return res.status(403).json({ message: 'Email not verified' });

    // hash password
    const hashedPassword = await hashPassword(password);

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
        },
    });

  } catch (error: any) {
    console.error("Error during signup:", error);
    throw new Error(error.message);
  }
};

export const signin = async (req: Request, res: Response) : Promise<any> => {
  try {
  } catch (error: any) {
    console.error("Error during signup:", error);
    throw new Error(error.message);
  }
};

export const sendOtp = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body;
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
        console.log("otp : ",otp);
        res.status(StatusCodes.ACCEPTED).json({ success:true, message: 'OTP sent successfully' });
    } catch (error: any) {
        console.error("Error during signup:", error.message);
        throw new Error(error.message);
    }
}

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, otp } = req.body;
      const storedOtp = await redisClient.get(`otp:${email}`);
      if (storedOtp == otp) {
        await redisClient.setEx(`verified:${email}`, 600, 'true'); //expires in 10 min
        res.status(200).json({ message: 'Email verified. You can now signup.' });
      } else {
         res.status(StatusCodes.ACCEPTED).json({success:false, message: 'Invalid or expired OTP' });
      }
    } catch (error: any) {
        console.error("Error during signup:", error.message);
        throw new Error(error.message);
    }
}


