import { Types } from "mongoose";

export interface IEducation {
  institution: string;
  degree: string;
  grade: string;
  start_date: Date;
  end_date?: Date;
}

export interface IStudentProfile {
  user: Types.ObjectId;
  skills: string[];
  portfolio?: string;
  resume?: string;
  education: Types.ObjectId[];
  saved_tasks?: Types.ObjectId[];
  applied_tasks?: Types.ObjectId[];
  completed_tasks?: Types.ObjectId[];
  certificates: Types.ObjectId[];
  qr_code?: string;
  is_deleted?: boolean;
  dob: Date;
}