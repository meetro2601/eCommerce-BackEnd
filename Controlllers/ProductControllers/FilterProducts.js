const ProductSchema = require("../../SchemaModels/ProductSchema");

const FilterProducts = (req, res) => {
  ProductSchema.find({
        $and: Object.keys(req.query).map((key) => {
          return { [key]: req.query[key] };
        }),
    }).then((products) => {
        if(products.length === 0 ){
          return res.status(404).send({error:"No Products Found"})
        }
        return res.send(products)})
      .catch((err) => res.status(400).send({error:'Error while Filtering Products'}));
};

module.exports = FilterProducts;