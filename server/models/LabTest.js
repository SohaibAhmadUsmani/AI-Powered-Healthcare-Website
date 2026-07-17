const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "General" },
    description: { type: String, default: "" },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabTest", labTestSchema);