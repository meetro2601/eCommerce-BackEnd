const express = require("express");
const SellerLogin = require("../Controlllers/SellerControllers/SellerLogin");
const SellerRegister = require("../Controlllers/SellerControllers/SellerRegister");
const verifyOtp = require("../Middlewares/VerifyOtp");
const router = express.Router();

router.post("/login", SellerLogin);

router.post("/register", verifyOtp, SellerRegister);

module.exports = router;