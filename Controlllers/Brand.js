const BrandSchema = require("../SchemaModels/BrandSchema");
const fs = require("fs");

const addBrand = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ imgErr: "Please upload an Image" });
  }
  const imgPath = fs.readFileSync(req.file.path);
  const image = {
    binaryImg: imgPath,
    type: req.file.mimetype,
    path: req.file.path,
  };

  const newBrand = await new BrandSchema({
    ...req.body,
    logo: image,
  });

  newBrand
    .save()
    .then((brand) => res.send({ message: "Brand added Successfully" }))
    .catch((error) => {
      fs.unlinkSync(req.file.path);
      return res.status(500).send(error);
    });
};

const getBrands = (req, res) => {
  BrandSchema.find()
    .then((brands) => res.send(brands))
    .catch((err) => res.status(500).send(err));
};

const updateBrand = (req, res) => {
  const imagePath = fs.readFileSync(req.file.path);
  const image = {
    binaryImg: imagePath,
    type: req.file.mimetype,
    path: req.file.path,
  };

  BrandSchema.findByIdAndUpdate(req.params.brandId, {
    $set: { ...req.body, logo: image },
  })
    .then((oldDoc) => {
      fs.unlinkSync(oldDoc.logo.path);
      return res.status(500).send({ message: "Brand updated successfully" });
    })
    .catch((err) => res.status(500).send(err));
};

const removeBrand = (req, res) => {
  BrandSchema.findByIdAndDelete(req.params.brandId)
    .then((result) => {
      fs.unlinkSync(result.logo.path);
      return res.send({ message: "Brand removed successfully" });
    })
    .catch((err) => res.status(500).send(err));
};

module.exports.addBrand = addBrand;
module.exports.getBrands = getBrands;
module.exports.updateBrand = updateBrand;
module.exports.removeBrand = removeBrand;
