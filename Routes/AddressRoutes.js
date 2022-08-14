const express = require("express");
const { addAddress, removeAddress, getAddresses } = require("../Controlllers/Address");
const VerifyToken = require("../Middlewares/VerifyToken");
const router = express.Router();

router.post("/add",VerifyToken, addAddress);

router.get('/',VerifyToken, getAddresses)

router.delete("/remove/:addressId",VerifyToken, removeAddress);

module.exports = router