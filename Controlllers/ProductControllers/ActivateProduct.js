const ProductSchema = require("../../SchemaModels/ProductSchema");

const ActivateProduct = async (req, res) => {
  if(req.seller){
    ProductSchema.findByIdAndUpdate({ _id: req.params.productId },{$set:{status:'Active'}})
    .then((product) => {
      if(!product){
        return res.status(404).send({error:'No product found'})
      }
      return res.send({message:'Activated Successfully'})
    })
    .catch((err) => console.log(err));
  }else{
    return res.status(401).send({error:'Unauthorized'})
  }
};

module.exports = ActivateProduct;