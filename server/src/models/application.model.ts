import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
    submission_note: { type: String, required: true },
    chat_thread: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatThread' }],
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    applied_at: { type: Date, default: Date.now },
    submitted_at: { type: Date, default: null },
    reviewd_at: { type: Date, default: null },
    is_deleted: { type: Boolean, default: false },
    is_paid: { type: Boolean, default: false },
    is_certificate_issued: { type: Boolean, default: false },
    files:[
        {
           type: String, 
           required: false
        },
    ]
  },
  { timestamps: true, underscore:true }
);

ApplicationSchema.index({ student: 1, opportunity: 1 }, { unique: true });

export const Application = mongoose.model('Application', ApplicationSchema);
