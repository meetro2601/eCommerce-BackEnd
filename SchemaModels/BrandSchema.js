const mongoose = require("mongoose");
const ImageSchema = require("./ImageSchema");

const BrandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    logo: {
      type:ImageSchema.schema,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brands", BrandSchema);
