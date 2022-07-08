const express = require('express')
const { addBrand, getBrands, removeBrand, updateBrand } = require('../Controlllers/Brand')
const VerifyToken = require('../Middlewares/VerifyToken')
const router = express.Router()
const path = require('path')
const multer = require('multer')

const Storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"Public/Uploads/BrandImages")
    },
    filename: function(req,file,cb){
        cb(null,req.body.brandName + "-" + Date.now() + path.extname(file.originalname))
    }
})

// const filter = (req,file,cb)=>{
//     if(req.seller){
//         cb(null,true)
//     }else{
//         cb(new Error("Not Authenticated"),false)
//     }
// }

const upload = multer({storage: Storage})

router.post('/add',VerifyToken,upload.single('brandImage'),addBrand)

router.get('/get',getBrands)

router.put('/update/:brandId',VerifyToken,upload.single('brandImage'),updateBrand)

router.delete('/remove/:brandId',VerifyToken,removeBrand)

module.exports = router