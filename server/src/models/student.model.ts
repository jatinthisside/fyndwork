import mongoose from "mongoose";

const StudentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skills: [String],
    portfolio: String,
    resume: String,
    education: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education",
      },
    ],
    saved_tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    applied_tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    completed_tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    certificates:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Certificate",
        },
    ],
    qr_code: {
        type: String,
        required: false,
        default: "",
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    dob:{
        type: Date,
        required: true,
    }
  },
  { timestamps: true, underscore: true } 
);

export const StudentProfile = mongoose.model("StudentProfile",StudentProfileSchema);
