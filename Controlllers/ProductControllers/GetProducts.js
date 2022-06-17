const ProductSchema = require("../../SchemaModels/ProductSchema");
const fs = require('fs')

const GetProducts = (req, res) => {
  ProductSchema.find()
    .then((products) => {
        // const img = fs.writeFileSync("Public/Uploads/Images/ABC.jpg",products[0].productImages[0].data)
        return res.send(products[0].productImages[0].data)
    //   res.contentType(products[0].productImages[0].contentType);
    })
    .catch((err) => console.log(err));
};

module.exports = GetProducts;
