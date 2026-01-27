import express from 'express';

import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());

app.use("/api/vi", apiRouter);


app.listen(3000, () => {
    console.log("Server is Running on Port 3000");
});