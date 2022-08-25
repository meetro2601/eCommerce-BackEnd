const OTPSchema = require("../SchemaModels/OTPSchema");
const bcrypt = require("bcryptjs");
const sendEmail = require("../Utils/SendEmail");
const sendSMS = require("../Utils/SendSMS");

const SendOtp = async (req, res) => {
  try {
    const emailOTP = Math.floor(100000 + Math.random() * 900000);
    const mobileOTP = Math.floor(100000 + Math.random() * 900000);

    const emailOTPHashed = bcrypt.hashSync(emailOTP.toString(), 10);
    const mobileOTPHashed = bcrypt.hashSync(mobileOTP.toString(), 10);

    const newOtps = await new OTPSchema({
      emailOTP: emailOTPHashed,
      mobileOTP: mobileOTPHashed,
    });

    const emailSent = await sendEmail(req.body.email,emailOTP);
    const smsSent = await sendSMS(req.body.mobile, mobileOTP);

    if (!emailSent || !smsSent) {
      return res.status(500).send({error:"Error while Sending OTPs"});
    }

    newOtps.save().then((otp) => {
      console.log(emailOTP, mobileOTP);
      return res.status(200).send({ otpId: otp._id });
    });
  } catch (error) {
    return res.status(500).send({ error: "Error while generating OTPs" });
  }
};

module.exports = SendOtp;