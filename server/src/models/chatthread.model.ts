// src/models/chatThread.model.ts
import mongoose from 'mongoose';

const ChatThreadSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Types.ObjectId, ref: 'Application', required: true },
    sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    messages: [
      {
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        from: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
      },
    ],
  },
  {
    timestamps: true,
    underscore: true, 
  }
);

export const ChatThread = mongoose.model('ChatThread', ChatThreadSchema);
