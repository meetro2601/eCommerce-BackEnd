const express = require('express')
const createOrder = require('../Controlllers/OrderControllers/CreateOrder')
const getOrders = require('../Controlllers/OrderControllers/GetOrders')
const VerifyToken = require('../Middlewares/VerifyToken')
const updateOrder = require('../Controlllers/OrderControllers/UpdateOrder')
const router = express.Router()

router.post('/create',VerifyToken,createOrder)

router.get('/get',VerifyToken,getOrders)

router.put('/update/:orderId',updateOrder)

module.exports = router