require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendEmail = async (email, otp) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_EMAIL_KEY);

    const otpMailMsg = {
      from: process.env.AUTH_EMAIL,
      to: `${email}`,
      subject: "OTP for registration on Biomall",
      html: `<p>Welcome</b></p>
      <p>Here is your One Time Password (OTP) for Email verification</p>
      <p style="color:red;font-size:24px">${otp}</p>
      <p>Note: Above OTP is only valid for 10 minutes.</p>
      `,
    };

    await sgMail.send(otpMailMsg);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendEmail;
