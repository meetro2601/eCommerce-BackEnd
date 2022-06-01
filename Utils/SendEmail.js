require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);
    return true
  } catch (error) {
    return false
  }
};

module.exports = sendEmail;
