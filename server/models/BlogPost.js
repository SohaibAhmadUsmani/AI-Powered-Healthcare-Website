const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "Health Tips" },
    summary: { type: String, required: true },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);