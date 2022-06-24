const ProductSchema = require("../../SchemaModels/ProductSchema");

const DeactivateProduct = async (req, res) => {
  ProductSchema.findByIdAndUpdate({ _id: req.params.productId },{$set:{status:'InActive'}})
    .then((product) => {
      return res.send({message:'Deactivated Successfully'})
    })
    .catch((err) => console.log(err));
};

module.exports = DeactivateProduct;