require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OTPSchema = require("../../SchemaModels/OTPSchema");
const UserSchema = require("../../SchemaModels/UserSchema");

const UserRegister = (req, res) => {
  bcrypt.hash(req.body.user?.password, 12, (err, hash) => {
    if (err) {
      return res.status(500).send();
    } else {
      UserSchema.create({ ...req.body.user, password: hash })
        .then((user) => {
          OTPSchema.findByIdAndDelete({_id: req.body.otpObj.otpId},(err,doc)=>{
            if(err){
              return res.status(500).send()
            }
          })
          return res.status(200).send({message:"Registered Successfully"});
        })
        .catch((error) => res.status(400).send({ error: error.keyValue }));
    }
  });
};

module.exports = UserRegister;

