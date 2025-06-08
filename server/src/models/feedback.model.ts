import mongoose from 'mongoose';

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

export const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);
