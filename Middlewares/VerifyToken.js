require("dotenv").config();
const jwt = require("jsonwebtoken");
const SellerSchema = require("../SchemaModels/SellerSchema");
const UserSchema = require("../SchemaModels/UserSchema");

const VerifyToken = async (req, res, next) => {
  try {
    const resetToken = req.query.token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    const User = await UserSchema.findOne({_id:decoded.id})
    const Seller = await SellerSchema.findOne({_id:decoded.id})

    if(User){
        req.user = decoded.id
        next()
    }else if(Seller){
      req.seller = decoded.id
      next()
    }
  } catch (error) {
    return res.status(400).send({ error: "Invalid Token" });
  }
};

module.exports = VerifyToken;
