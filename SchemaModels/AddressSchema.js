const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    shippingAddresses:[
        {
            fullName:{type:String,required:true,lowercase:true},
            phone:{type:String,required:true},
            address:{type:String,required:true,lowercase:true},
            landmark:{type:String,required:true,lowercase:true},
            pincode:{type:Number,required:true},  
            city:{type:String,required:true,lowercase:true},  
            state:{type:String,required:true,lowercase:true},  
            country:{type:String,required:true,lowercase:true},  
            alternateNum:String,
            createdAt:{type:Date,default:Date.now}
        }
    ],
    billingAddresses:[
        {
            fullName:{type:String,required:true,lowercase:true},
            phone:{type:String,required:true},
            address:{type:String,required:true,lowercase:true},
            landmark:{type:String,required:true,lowercase:true},
            pincode:{type:Number,required:true},  
            city:{type:String,required:true,lowercase:true},  
            state:{type:String,required:true,lowercase:true},  
            country:{type:String,required:true,lowercase:true},  
            alternateNum:String,
            createdAt:{type:Date,default:Date.now}
        }
    ]
})

module.exports = mongoose.model('User Addresses',AddressSchema)