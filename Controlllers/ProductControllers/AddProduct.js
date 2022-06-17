const fs = require("fs");
const ProductSchema = require("../../SchemaModels/ProductSchema");

const AddProduct = async (req, res) => {
  if (req.files?.length === 0) {
    return res.status(400).send({ fileErr: "Please Upload Image" });
  }

  const images = await req.files?.map((file) => {
    console.log((file.path).toString('base64'))
    const imgPath = fs.readFileSync(file.path);
    const encode_Img = imgPath.toString('base64')

    const image = {
      contentType: file.mimetype,
      data: Buffer.from(encode_Img).toString('base64')
    };
    return image;
  });

  const newProduct = await new ProductSchema({
    seller: req.seller,
    productImages: images,
    ...req.body,
  });

  newProduct
    .save()
    .then((product) => res.send(product))
    .catch((err) => {
        console.log(err)
        return res.status(500).send({ error: "Failed to Add Product" })});
};

module.exports = AddProduct;