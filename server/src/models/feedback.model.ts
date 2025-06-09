import mongoose from 'mongoose';

// [TODO]: we can add a field eg. is_verified to ensure that the feedback is geniun and if it is, than we can give reward to user
const FeedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type:{
        type: String,
        enum: ['bug', 'feature', 'general'],
        required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'declined'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    tags: {
      type: [String],
      default: [],
    },
    response: {
      type: String,
      trim: true,
      default: null,
    },
    responseDate: {
      type: Date,
      default: null,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true, underscore : true }
);

export const Feedback = mongoose.model('Feedback', FeedbackSchema);
