const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
    discoveredThrough: String,
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("users", UserSchema);