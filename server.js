import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db.js'

import BlogRoute from './router/BlogRoute.js';


config()
const app = express()
const port = process.env.PORT 
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))
connectDB()

app.use('/blogs',BlogRoute)
app.get('/',(req,res)=>{
    res.send("<h1>welcome to server:)</h1>")
})
app.listen(port, ()=>{
    console.log(`server is listening on port ${port} ...clt+c to stop`)
})
