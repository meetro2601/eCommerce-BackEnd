const OrderSchema = require("../../SchemaModels/OrderSchema");

const updateOrder = (req, res) => {
  OrderSchema.findByIdAndUpdate(
    { _id: req.params.orderId },
    { $set: { status: "cancelled" } },
    { new: true, runValidators: true }
  )
    .then((order) => res.send(order))
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = updateOrder;
