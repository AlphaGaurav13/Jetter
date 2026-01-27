import express from 'express';
import connectDB from './db.js';
import mainRouter from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); 
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);
app.use(express.json());


connectDB();
app.get("/", (req, res) => {
    res.send("JETTER is running on");
})

app.listen(3000, () => {
    console.log("Server is Running on Port 3000");
});