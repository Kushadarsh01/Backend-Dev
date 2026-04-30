import express from 'express';
import { getProtectedData } from '../controllers/protectedCont.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", authenticateToken, getProtectedData);

export default router;
