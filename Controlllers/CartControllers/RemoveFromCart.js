const CartSchema = require("../../SchemaModels/CartSchema");

const removeFromCart = async (req, res) => {
  try {
    let cart = await CartSchema.findOne({ user: req.user });

    if (cart) {
      let updatedProducts = cart.products.filter(
        (item) => item.product._id != req.params.productId
      );

      if (updatedProducts.length > 0) {
        cart.products = updatedProducts;
        await cart.save();
        return res.status(202).send(cart);
      } else {
        await CartSchema.deleteOne({ user: req.user });
        return res.status(202).send({ message: "Empty Cart" });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = removeFromCart;
