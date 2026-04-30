import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cartRoutes from './routes/cartRoutes.js';
import initCart from './middlewares/cartMiddleware.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(initCart);

app.use('/cart', cartRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
