// src/models/Log.model.ts
import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema(
  {
    level: { type: String, enum: ['error', 'warn', 'http', 'info'], required: true },
    message: { type: String, required: true },
    meta: {
      method: String,
      url: String,
      statusCode: Number,
      responseTime: Number,
      stack: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  },
  { timestamps: true }
);

export const Log = mongoose.model('Log', LogSchema);
