const ProductSchema = require("../../SchemaModels/ProductSchema");
const fs = require("fs");

const DeleteProduct = (req,res)=>{
    if(req.seller){
        ProductSchema.findByIdAndDelete({_id:req.params.productId})
        .then((product) => {
            product.productImages.map((image) => {
                fs.unlinkSync(image.path)
            });
            return res.send({message:"Product Deleted Successfully"})
        })
        .catch((err) => {
            res.status(500).send({error:"Error getting Product details"})
        });
    }else{
        return res.status(401).send({error:'Unauthorized'})
    }
}

module.exports = DeleteProduct