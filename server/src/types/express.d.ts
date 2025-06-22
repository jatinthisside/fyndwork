import { IUser } from "../interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;  // Optional because not all routes need it
    }
  }
}