import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.listen(port, () => {
    console.log(`Server up at http://localhost:${port}`);
})