import bcrypt from "bcrypt";
import { logger } from "../config";

export const hashPassword=(password:any)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error:any) {
        logger.error(`Error hashing password: ${error.message}`);
        throw new Error("Failed to hash password");
    }
}
