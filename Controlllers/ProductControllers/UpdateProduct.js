const ProductSchema = require("../../SchemaModels/ProductSchema");
const fs = require("fs");

const UpdateProduct = async (req, res) => {
 
  const images = await req.files?.map((file) => {
    const imgPath = fs.readFileSync(file.path);

    const image = {
      binaryImg: imgPath,
      type: file.mimetype,
      path: file.path,
    };

    return image;
  });

  ProductSchema.findByIdAndUpdate(
    { _id: req.params.productId },
    { $set: { ...req.body, productImages: images } }
  )
    .then((oldProduct) => {
      oldProduct.productImages.map((image) => {
        fs.unlinkSync(image.path)
      });
      return res.send(oldProduct);
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = UpdateProduct;