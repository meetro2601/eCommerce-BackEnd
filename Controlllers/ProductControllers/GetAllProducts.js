const ProductSchema = require("../../SchemaModels/ProductSchema");

const GetAllProducts = (req, res) => {
  ProductSchema.find()
    .then((products) => {
      if(products.length === 0 ){
        return res.status(404).send({error:"No Products Found"})
      }
      return res.send(products)})
    .catch((err) => res.status(400).send({error:'Error getting Products'}));
};

module.exports = GetAllProducts;
