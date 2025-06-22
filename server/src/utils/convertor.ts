import { Types } from "mongoose";

export const toObjectId = (value: string | Types.ObjectId): Types.ObjectId => {
  if (Types.ObjectId.isValid(value)) {
    return typeof value === "string" ? new Types.ObjectId(value) : value;
  }
  throw new Error("Invalid ObjectId");
};

export const isValidObjectId = (value: string): boolean => {
    return Types.ObjectId.isValid(value);
};