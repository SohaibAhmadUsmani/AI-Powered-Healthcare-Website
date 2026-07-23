const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    dosage: { type: String, default: "" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    available: { type: Boolean, default: true },
    reviews: {
      type: [
        {
          author: { type: String, required: true },
          comment: { type: String, required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
