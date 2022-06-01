const express = require("express");
const UserLogin = require("../Controlllers/UserControllers/UserLogin");
const UserRegister = require("../Controlllers/UserControllers/UserRegister");
const verifyOtp = require("../Middlewares/VerifyOtp");
const router = express.Router();

router.post("/login", UserLogin);

router.post("/register", verifyOtp, UserRegister);

module.exports = router;