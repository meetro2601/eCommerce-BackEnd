require('dotenv').config()
const mongoose = require('mongoose')

const connectToMongo = ()=>{
        mongoose.connect(process.env.MONGO_ATLAS_URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true
        })
        .then(()=>console.log('Connected'))
        .catch((error)=>console.log(error))
}


module.exports = connectToMongo