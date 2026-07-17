const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    number: { type: String, required: true },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema);