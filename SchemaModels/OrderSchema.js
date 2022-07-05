const mongoose = require("mongoose");

// const PaymentSchema = new mongoose.Schema({
//   paymentMethod: {
//     type: String,
//     required: true,
//   },
//   paymentId: {
//     type: String,
//     required: true,
//   },
// });

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        amountToPay: {
          type: Number,
          required: true,
        },
        orderedQuantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  // shippingAddress:{

  // },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "refund"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "delivered", "dispatched", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("orders", OrderSchema);
