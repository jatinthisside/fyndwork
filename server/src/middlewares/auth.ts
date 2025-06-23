import { Request, Response, NextFunction, RequestHandler } from "express";
import { IUser } from "../types";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT_SECRET, logger } from "../config";

type AllowedRoles = "student" | "company" | "admin" | "all";

export const decodeToken = (req: Request | any, res: Response, next: NextFunction): any => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1] || req.body.token;
    
    if (!token) {
        return res.status(StatusCodes.FORBIDDEN).json({ success: false, error: "Unauthorized: No user found" });
    }

    if(!JWT_SECRET) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: "JWT secret not configured" });
    }

    try {
        const decodedUser = jwt.verify(token,JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error:any) {
        logger.error(`Error decoding token: ${error.message}`);
        return res.status(StatusCodes.FORBIDDEN).json({ success: false, error: error.message });
    }
}

export const authenticate = (role: AllowedRoles = "all"):RequestHandler => {
    return (req: Request | any, res: Response, next: NextFunction):any => {
      const user = req.user as IUser | undefined;
  
      if (!user) {
        return res.status(StatusCodes.FORBIDDEN).json({ success:false, error: "Unauthorized: No user found" });
      }
  
      if (role === "all") {
        return next();
      }
  
      if (user.role !== role) {
        return res.status(StatusCodes.FORBIDDEN).json({ 
          error: `Forbidden: ${user.role} cannot access ${role}-only routes` 
        });
      }
  
      next();
    };
  };