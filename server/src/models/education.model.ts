import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    grade: { type: String, required: false },
    }, 
    {timestamps: true,underscore: true}
)

export const Education = mongoose.model('Education', educationSchema);