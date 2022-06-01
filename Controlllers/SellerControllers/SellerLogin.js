require('dotenv').config()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SellerSchema = require('../../SchemaModels/SellerSchema');

const SellerLogin = async (req, res) => {
  try {
    const Seller = await SellerSchema.findOne({
      $or: [{ email: req.body.seller }, { mobile: req.body.seller }],
    });
    if (Seller) {
      //password confimation if user exists
      bcrypt.compare(req.body.password, Seller.password).then((val) => {
        if (val == false) {
          return res
            .status(400)
            .json({ error: "Incorrect Email Id or Password" });
        }
        //signing a token after user is verified and password confirmation returns true
        jwt.sign({ Seller }, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            return res.status(500).send("Token generation error");
          }
          // res.cookie("iNotes_jwt", token, { httpOnly: true });
          res.status(200).json({ token, Seller });
        });
      });
    } else {
      res.status(400).send({ error: "Incorrect Email Id or Password" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = SellerLogin