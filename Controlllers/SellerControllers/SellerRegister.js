require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SellerSchema = require("../../SchemaModels/SellerSchema");

const SellerRegister = (req, res) => {
  bcrypt.hash(req.body.seller?.password, 12, (err, hash) => {
    if (err) {
      return res.status(500).send();
    } else {
      SellerSchema.create({ ...req.body.seller, password: hash })
        .then((seller) => {
          OTPSchema.findOneAndDelete({_id: req.body.otpObj.otpId},(err,doc)=>{
            if(err){
              return res.status(500).send()
            }
            return res.status(200).send({message:"Registered Successfully"});
        })
      })
        .catch((error) => res.send({ error: error.keyValue }));
    }
  });
};

module.exports = SellerRegister;