const CartSchema = require("../../SchemaModels/CartSchema");

const addToCart = async (req, res) => {
  try {
    const cart = await CartSchema.findOne({ user: req.user });

    if (cart) {
      let product = cart.products.find(
        (item) => item.product._id == req.body.product
      );

      if (product) {
        product.quantity = req.body.quantity;
      } else {
        cart.products.push({ ...req.body });
      }

      await cart.populate("products.product", "productName price packSize");

      await cart.save();

      return res.status(201).send({ cart });
    } else {
      const cart = await new CartSchema({
        user: req.user,
        products: [{ ...req.body }],
      });

      await cart.populate("products.product", "productName price packSize");

      await cart.save();

      return res.status(201).send({ cart });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = addToCart;