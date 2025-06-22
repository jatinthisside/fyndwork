import { Request, Response, NextFunction, RequestHandler } from "express";
import { IUser } from "../types";
import { StatusCodes } from "http-status-codes";

type AllowedRoles = "student" | "company" | "admin" | "all";

export const authenticate = (role: AllowedRoles = "all"):RequestHandler => {
    return (req: Request | any, res: Response, next: NextFunction):any => {
      const user = req.user as IUser | undefined;
  
      if (!user) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Unauthorized: No user token" });
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