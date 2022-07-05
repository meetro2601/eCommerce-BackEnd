const OrderSchema = require("../../SchemaModels/OrderSchema");

const createOrder = (req, res) => {
  if (req.user) {
    OrderSchema.create({ customer:req.user,...req.body })
      .then((doc) => {
        res.send(doc);
      })
      .catch((err) => console.log(err));
  }
};

module.exports = createOrder;
