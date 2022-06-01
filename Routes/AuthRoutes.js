const express = require("express");
const ForgotPassword = require("../Controlllers/ForgotPassword");
const ResetPassword = require("../Controlllers/ResetPassword");
const SendOtp = require("../Controlllers/SendOtp");
const checkEmail = require("../Middlewares/CheckEmail");
const checkMobile = require("../Middlewares/CheckMobile");
const VerifyToken = require("../Middlewares/VerifyToken");

const router = express.Router();

router.post("/sendOtp", [checkEmail, checkMobile], SendOtp);

router.post('/forgotpassword', ForgotPassword)

router.post('/resetpassword', VerifyToken, ResetPassword)

module.exports = router;