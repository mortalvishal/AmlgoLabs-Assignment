import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'


// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()

// Middleware
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port, ()=> console.log("Server Started",port))