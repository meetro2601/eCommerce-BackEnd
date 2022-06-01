const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    address: {
      city: String,
      state: String,
      country: String,
      zipcode: {
        type: Number,
        required: true,
      },
    },
    businessType:{
        type: String,
        required: true
    },
    taxNumber:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Sellers", SellerSchema);