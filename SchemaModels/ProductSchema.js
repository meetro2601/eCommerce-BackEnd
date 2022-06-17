const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
      data: Buffer,
    },
    price: {
      type: Number,
      required: true,
    },
    productImages: [
      {
          data:  Buffer,
          contentType: {
            type: String,
            required: true,
          },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    CAS: String,
    catalogNo: {
      type: String,
      required: true,
      unique: true,
    },
    packSize: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    expiryDate: Date,
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
