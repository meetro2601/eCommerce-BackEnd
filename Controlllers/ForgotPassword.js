require('dotenv').config()
const jwt = require("jsonwebtoken")
const SellerSchema = require("../SchemaModels/SellerSchema")
const UserSchema = require("../SchemaModels/UserSchema")
const sendEmail = require('../Utils/SendEmail')

const ForgotPassword = async (req,res)=>{
    try {
        const isUser = await UserSchema.findOne({email:req.body.email})
        const isSeller = await SellerSchema.findOne({email:req.body.email})

        if(!isUser && !isSeller){
            return res.status(400).send({error:"Invalid Email Id"})
        }
        const resetToken = jwt.sign({id:(isUser._id || isSeller._id)},process.env.JWT_SECRET,{expiresIn:'30m'})

        const mailOptions = {
            from: "meetbr26@gmail.com",
            to: `${req.body.email}`,
            subject: "BioMall - Reset your Password",
            html: `<p>Hi <b>${isUser.name || isSeller.name},</b></p>
                <p>Click below to reset your account password</p>
                <a href='${process.env.SITE_URL}auth/resetPassword?resetToken=${resetToken}'><p style="display:inline-block;padding:15px;background-color:#2e4e74;border:5px solid #ffae80f7;border-radius:10px;color:white">RESET PASSWORD</p></a>
                <p>If you did not request a password reset, just ignore this email and continue using your existing password.</p>
                <p>Note: Above link is only valid for 30 minutes</p>
                `,
          };

          const mailSent = await sendEmail(mailOptions)

          if(!mailSent){
              return res.status(500).send({error:'Error sending Reset link'})
          }

          return res.status(200).send({message:"Email sent with Reset link"})

    } catch (error) {
     return res.status(500).send({error:"Error generating Reset link"})   
    }
}

module.exports = ForgotPassword