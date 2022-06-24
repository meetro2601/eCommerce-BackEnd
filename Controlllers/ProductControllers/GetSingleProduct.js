const ProductSchema = require("../../SchemaModels/ProductSchema");

const GetSingleProduct = (req, res) => {
  ProductSchema.findOne({productName:req.params.productname})
    .then((product) => {
      if(product === null){
        return res.status(404).send({error:"No Product Found"})
      }
      return res.send(product)
    })
    .catch((err) => res.status(500).send({error:"Error getting Product details"}));
};

module.exports = GetSingleProduct;