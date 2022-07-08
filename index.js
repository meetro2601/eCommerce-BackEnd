require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

/* Connect to Database */
const connectToMongo = require('./db')
connectToMongo()

/* initializing app */ 
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use('/api/auth/user', require('./Routes/UserRoutes'))
app.use('/api/auth/seller', require('./Routes/SellerRoutes'))
app.use('/api/auth', require('./Routes/AuthRoutes'))
app.use('/api/products',require('./Routes/ProductRoutes'))
app.use('/api/category',require('./Routes/CategoryRoutes'))
app.use('/api/brands',require('./Routes/BrandRoutes'))
app.use('/api/orders',require('./Routes/OrderRoutes'))
app.use('/api/cart',require('./Routes/CartRoutes'))
app.use('/Public/Uploads/Images',express.static('Public/Uploads/Images'))

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})