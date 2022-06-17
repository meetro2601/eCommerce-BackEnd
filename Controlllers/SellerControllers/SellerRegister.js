require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OTPSchema = require("../../SchemaModels/OTPSchema");
const SellerSchema = require("../../SchemaModels/SellerSchema");

const SellerRegister = (req, res) => {
  bcrypt.hash(req.body.seller?.password, 12, (err, hash) => {
    if (err) {
      return res.status(500).send();
    } else {
      SellerSchema.create({ ...req.body.seller, password: hash })
        .then((seller) => {
          OTPSchema.findByIdAndDelete({_id: req.body.otpObj.otpId},(err,doc)=>{
            if(err){
              return res.status(500).send()
            }
          })
          return res.status(200).send({message:"Registered Successfully"});
      })
        .catch((error) => res.status(500).send({ error: error.keyValue }));
    }
  });
};

module.exports = SellerRegister;