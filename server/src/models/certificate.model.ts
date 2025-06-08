import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    issue_date: { type: Date, default: Date.now },
    issued_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    certificate_url: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    is_emailed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model('Certificate', CertificateSchema);
