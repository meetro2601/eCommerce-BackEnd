const mongoose = require("mongoose");
const ImageSchema = require("./ImageSchema");

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
      lowercase:true
    },
    price: {
      type: Number,
      required: true,
    },
    productImages: {
      type: [ImageSchema.schema],
      required: true,
    },
    description: {
      type: String,
      required: true,
      lowercase:true
    },
    category: {
      type: String,
      required: true,
      lowercase:true
    },
    brand: {
      type: String,
      required: true,
      lowercase:true
    },
    CAS: String,
    catalogNo: {
      type: String,
      required: true,
      unique: true,
      uppercase:true
    },
    packSize: {
      type: String,
      required: true,
      lowercase:true
    },
    unit: {
      type: String,
      required: true,
      lowercase:true
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
      default: "InActive",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
