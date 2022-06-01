require("dotenv").config();
const twilio = require("twilio");

const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_AUTH_TOKEN;

const sendSMS = async (mobile, otp) => {
  try {
    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `OTP for Mobile verification on Biomall is ${otp}`,
      from: process.env.SMS_PHONE_NUMBER,
      to: mobile,
    });
    return true
  } catch (error) {
    return false
  }
};

module.exports = sendSMS;