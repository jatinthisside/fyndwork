import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: false, unique: true, index: true },
    role: {
      type: String,
      enum: ["student", "company", "admin"],
      required: true,
    },
    about:{
        type: String,
        required: false,
        default: ""
    },
    city: { type: String, required: false, index: true },
    state: { type: String, required: false },
    country: { type: String, required: false },
    pincode: { type: Number, required: false },
    street: { type: String, required: false },
    password: { type: String, required: false }, // Optional for OAuth users
    profile_photo: { type: String },
    student_profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
    },
    company_profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
    },
    rating_and_reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    last_login: { type: Date, default: Date.now },
    settings: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
