// src/models/Opportunity.model.ts
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: {type: String, required: true },
    stipend: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {type: Number, required: true, min: 1}, // Duration in days
    deadline: { type: Date, required: true },
    status: {type: String, enum: ['open', 'closed', 'in_progress'], default: 'open' },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'Category' },
    tags:[{
        type:String,
        required: true
    }],
    mode: { type: String, enum: ['remote', 'onsite', 'hybrid'] },
    skills_required: {
        type: [String],
        required: true,
        validate: {
            validator: function (v: string[]) {
            return v.length > 0;
            },
            message: 'At least one skill is required.',
        },
        },
    isActive: { type: Boolean, default: true },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    requirements:[
        {
            type: String,
            required: true
        }
    ],
    terms_and_conditions:[{
        type: String,
        required: true
    }],
    is_deleted: {
        type: Boolean,
        default: false
    },
  },
  { timestamps: true, underscore: true}
);

export const Task = mongoose.model('Task', TaskSchema);
