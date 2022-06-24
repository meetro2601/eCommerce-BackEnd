const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    binaryImg:{
        type:Buffer,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('images',ImageSchema)