const Sellers = require("../SchemaModels/SellerSchema");
const Users = require("../SchemaModels/UserSchema");

const checkMobile = async (req, res, next) => {
  const userMobile = await Users.findOne({ mobile: req.body.mobile });
  const sellerMobile = await Sellers.findOne({ mobile: req.body.mobile });

  if (userMobile || sellerMobile) {
    return res.status(400).send({ mobileError: "Mobile already exists" });
  }
  next();
};

module.exports = checkMobile;
