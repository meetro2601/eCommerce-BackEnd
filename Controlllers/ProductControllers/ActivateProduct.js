const ProductSchema = require("../../SchemaModels/ProductSchema");

const ActivateProduct = async (req, res) => {
  ProductSchema.findByIdAndUpdate({ _id: req.params.productId },{$set:{status:'Active'}})
    .then((product) => {
      return res.send({message:'Activated Successfully'})
    })
    .catch((err) => console.log(err));
};

module.exports = ActivateProduct;