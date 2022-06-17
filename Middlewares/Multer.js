const path = require('path')
const multer = require('multer')

const Storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"Public/Uploads/Images")
    },
    filename: function(req,file,cb){
        cb(null,req.body.productName + "-" + Date.now() + path.extname(file.originalname))
    }
})

const filter = (req,file,cb)=>{
    if(req.seller){
        cb(null,true)
    }else{
        cb(new Error("Not Authenticated"),false)
    }
}

const upload = multer({storage: Storage,fileFilter:filter})

module.exports = upload