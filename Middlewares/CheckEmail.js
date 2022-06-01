const Sellers = require("../SchemaModels/SellerSchema");
const Users = require("../SchemaModels/UserSchema");

const checkEmail = async (req, res, next) => {
  const userEmail = await Users.findOne({ email: req.body.email })
  const sellerEmail = await Sellers.findOne({ email: req.body.email })

  if(userEmail || sellerEmail){
     return res.status(400).send({emailError:'Email already exists'})
  }
  next();
};

module.exports = checkEmail