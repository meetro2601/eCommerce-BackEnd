require("dotenv").config();
const bcrypt = require("bcryptjs");
const SellerSchema = require("../SchemaModels/SellerSchema");
const UserSchema = require("../SchemaModels/UserSchema");

const ResetPassword = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.newPassword, 12);

    if (req.user) {
      var result = await UserSchema.updateOne(
        { _id: req.user },
        { $set: { password: hash } }
      );
    }

    if (req.seller) {
      var result = await SellerSchema.updateOne(
        { _id: req.seller },
        { $set: { password: hash } }
      );
    }

    if (result.modifiedCount === 0) {
      return error;
    }

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Failed to update password" });
  }
};

module.exports = ResetPassword;