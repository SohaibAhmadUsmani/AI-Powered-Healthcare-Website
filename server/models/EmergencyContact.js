import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    number: { type: String, required: true },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

export default EmergencyContact;