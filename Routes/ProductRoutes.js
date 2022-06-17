const express = require('express')
const AddProduct = require('../Controlllers/ProductControllers/AddProduct')
const GetProducts = require('../Controlllers/ProductControllers/GetProducts')
const upload = require('../Middlewares/Multer')
const VerifyToken = require('../Middlewares/VerifyToken')
const router = express.Router()

router.get('/',GetProducts)
router.post('/addproduct',VerifyToken,upload.array('productImages'),AddProduct)

module.exports = router