import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest', required: true },
    testName: { type: String, required: true },
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;