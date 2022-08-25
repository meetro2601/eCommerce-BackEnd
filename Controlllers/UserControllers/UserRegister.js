require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OTPSchema = require("../../SchemaModels/OTPSchema");
const UserSchema = require("../../SchemaModels/UserSchema");

const UserRegister = (req, res) => {
  bcrypt.hash(req.body.password, 12, (err, hash) => {
    if (err) {
      return res.status(500).send();
    } else {
      UserSchema.create({
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
        password: hash,
      })
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

