// src/models/RatingReview.model.ts
import mongoose from 'mongoose';

const RatingReviewSchema = new mongoose.Schema(
  {
    review_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5, index: true },
    review: String,
    review_type: {
        type: String,
        enum: ['student', 'company'],
        default: 'student',
    },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true, underscore:true }
);

export const RatingReview = mongoose.model('RatingReview', RatingReviewSchema);
