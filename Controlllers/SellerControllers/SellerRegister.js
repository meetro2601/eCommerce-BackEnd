require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OTPSchema = require("../../SchemaModels/OTPSchema");
const SellerSchema = require("../../SchemaModels/SellerSchema");

const SellerRegister = (req, res) => {
  bcrypt.hash(req.body.password, 12, (err, hash) => {
    if (err) {
      return res.status(500).send();
    } else {
      SellerSchema.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        company: req.body.company,
        designation: req.body.designation,
        address: {
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          zipcode: req.body.zipcode,
        },
        businessType:req.body.businessType,
        taxNumber:req.body.taxNumber,
        password: hash,
      })
        .then((seller) => {
          OTPSchema.findByIdAndDelete(
            { _id: req.body.otpObj.otpId },
            (err, doc) => {
              if (err) {
                return res.status(500).send();
              }
            }
          );
          return res.status(200).send({ message: "Registered Successfully" });
        })
        .catch((error) => res.status(500).send({ error: error.keyValue }));
    }
  });
};

module.exports = SellerRegister;
