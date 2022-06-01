require('dotenv').config()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require('../../SchemaModels/UserSchema');

const UserLogin = async (req, res) => {
  try {
    const User = await UserSchema.findOne({
      $or: [{ email: req.body.user }, { mobile: req.body.user }],
    });
    if (User) {
      //password confimation if user exists
      bcrypt.compare(req.body.password, User.password).then((val) => {
        if (val == false) {
          return res
            .status(400)
            .json({ error: "Incorrect Email Id or Password" });
        }
        //signing a token after user is verified and password confirmation returns true
        jwt.sign({ User }, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            return res.status(500).send("Token generation error");
          }
          // res.cookie("iNotes_jwt", token, { httpOnly: true });
          res.status(200).json({ token, User });
        });
      });
    } else {
      res.status(400).send({ error: "Incorrect Email Id or Password" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = UserLogin