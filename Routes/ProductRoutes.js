const express = require('express')
const ActivateProduct = require('../Controlllers/ProductControllers/ActivateProduct')
const AddProduct = require('../Controlllers/ProductControllers/AddProduct')
const DeactivateProduct = require('../Controlllers/ProductControllers/DeactivateProduct')
const DeleteProduct = require('../Controlllers/ProductControllers/DeleteProduct')
const FilterProducts = require('../Controlllers/ProductControllers/FilterProducts')
const GetAllActiveProducts = require('../Controlllers/ProductControllers/GetAllActiveProducts')
const GetAllProducts = require('../Controlllers/ProductControllers/GetAllProducts')
const GetSingleProduct = require('../Controlllers/ProductControllers/GetSingleProduct')
const UpdateProduct = require('../Controlllers/ProductControllers/UpdateProduct')
const upload = require('../Middlewares/Multer')
const VerifyToken = require('../Middlewares/VerifyToken')
const router = express.Router()

router.get('/all',GetAllProducts)

router.get('/active',GetAllActiveProducts)

router.get('/filterby',FilterProducts)

router.post('/addproduct',VerifyToken,upload.array('productImages',3),AddProduct)

router.post('/updateproduct/:productId',VerifyToken,upload.array('productImages',3),UpdateProduct)

router.post('/deactivate-product/:productId',VerifyToken,DeactivateProduct)

router.post('/activate-product/:productId',VerifyToken,ActivateProduct)

router.get('/:productname',GetSingleProduct)

router.delete("/delete/:productId",DeleteProduct)

module.exports = router