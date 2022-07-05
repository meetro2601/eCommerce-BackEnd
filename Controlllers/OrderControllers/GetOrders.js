const OrderSchema = require("../../SchemaModels/OrderSchema");

const getOrders = (req, res) => {
  OrderSchema.find()
    .populate("items.product", "productName seller")
    .populate('customer',"name email mobile company")
    .then((orders) => {
      let ordersList = [];
      if (req.seller) {
        for (let order of orders) {
          for (let item of order.items) {
            if (item.product.seller == req.seller)
              ordersList.push({ customer: order.customer, item });
          }
        }
      }else if(req.user){
        for(let order of orders) {
            if(order.customer._id == req.user) ordersList.push(order)
        }
      }
      else{
        ordersList = orders
      }
      return res.send(ordersList);
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = getOrders;
