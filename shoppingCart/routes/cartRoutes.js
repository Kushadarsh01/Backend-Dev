import express from 'express';
import { 
    addToCart, 
    updateCart, 
    removeFromCart, 
    getCart, 
    clearCart 
} from '../controllers/cartCont.js';

const router = express.Router();

router.post("/add", addToCart);
router.put("/update/:productId", updateCart);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);
router.get("/", getCart);

export default router;