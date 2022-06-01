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

    const otpMailOptions = {
      from: "meetbr26@gmail.com",
      to: `${req.body.email}`,
      subject: "OTP for registration on Biomall",
      html: `<p>Welcome</b></p>
      <p>Here is your One Time Password (OTP) for Email verification</p>
      <p style="color:red;font-size:24px">${emailOTP}</p>
      <p>Note: Above OTP is only valid for 10 minutes.</p>
      `,
    };

    const emailSent = await sendEmail(otpMailOptions);
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