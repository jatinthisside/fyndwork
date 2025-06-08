import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    transaction_id: { type: String, required: true, unique: true },
    initiated_at: { type: Date, default: Date.now },
    completed_at: { type: Date },
    payment_method: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer'], required: true },
    paid_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paid_by: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true, underscore:true }
);

export const Payment = mongoose.model('Payment', PaymentSchema);
