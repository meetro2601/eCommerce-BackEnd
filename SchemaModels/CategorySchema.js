const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'categories',
      default: null
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categories", CategorySchema);
