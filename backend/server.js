import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/authRoutes.js'


// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()

// Middleware
app.use(express.json())
app.use(cors())

// API Endpoints
app.use('/api/user', userRouter)

app.get('/',(req,res)=>{
    res.send('API working')
})

// Server uploads folder
app.use("/uploads", express.static(Path.join(__dirname,"uploads")));

app.listen(port, ()=> console.log("Server Started",port))