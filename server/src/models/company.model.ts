import mongoose from "mongoose";

const CompanyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    industry: String,
    website: String,
    company_size: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },
    verification_documents: [
        {
            type: String,
            required:false
        },
    ],
    is_verified: {
        type: Boolean,
        default: false,
    },
    posted_tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    saved_talents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ]
  },
  { timestamps: true, underscore: true }
);

export const CompanyProfileModel = mongoose.model(
  "CompanyProfile",
  CompanyProfileSchema
);
