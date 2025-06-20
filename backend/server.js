import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/authRoutes.js';
import incomeRouter from './routes/incomeRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url'; // ✅ Fix added here

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/income', incomeRouter);

app.get('/', (req, res) => {
    res.send('API working');
});

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => console.log("Server Started on port", port));
