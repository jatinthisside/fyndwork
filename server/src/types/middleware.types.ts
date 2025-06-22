import { Types } from "mongoose";

export interface IUser {
    user_id: Types.ObjectId;
    email: string;
    role: "student" | "company" | "admin";
    name: string;
}