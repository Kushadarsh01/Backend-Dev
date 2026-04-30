import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';

import studentRoutes from './routes/studentRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();
connectDB();

const app = express();
let port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/reports", reportRoutes);

app.listen(port, () => {
    console.log("Server running on port : ", port);
});