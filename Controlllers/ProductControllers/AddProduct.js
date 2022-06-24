const fs = require("fs");
const ProductSchema = require("../../SchemaModels/ProductSchema");

const AddProduct = async (req, res) => {
  if (req.files?.length === 0) {
    return res.status(400).send({ fileErr: "Please Upload Image" });
  }

  const images = await req.files?.map((file) => {
    const imgPath = fs.readFileSync(file.path);

    const image = {
      binaryImg: imgPath,
      type: file.mimetype,
      path: file.path,
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
    .then((product) => res.send({message:"Product Added Successfully"}))
    .catch((err) => {
      return res.status(500).send(err);
    });
};

module.exports = AddProduct;
