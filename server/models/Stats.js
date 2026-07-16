import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  consultations: {
    type: Number,
    required: true,
    default: 24790
  },
  recoveryRate: {
    type: Number,
    required: true,
    default: 98.4
  },
  activePatients: {
    type: Number,
    required: true,
    default: 1250
  },
  aiDiagnoses: {
    type: Number,
    required: true,
    default: 84930
  }
}, {
  timestamps: true
});

export const Stats = mongoose.model('Stats', statsSchema);
