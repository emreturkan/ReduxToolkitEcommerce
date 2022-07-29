const express = require('express')
const cors = require('cors')
const products = require('./products')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send(products)
})

app.listen(5000,console.log('Server Running on Port 5000'))