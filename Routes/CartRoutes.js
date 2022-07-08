const express = require('express')
const addToCart = require('../Controlllers/CartControllers/AddToCart')
const removeFromCart = require('../Controlllers/CartControllers/RemoveFromCart')
const VerifyToken = require('../Middlewares/VerifyToken')
const router = express.Router()

router.post('/add',VerifyToken,addToCart)

router.delete('/remove/:productId',VerifyToken,removeFromCart)

module.exports = router