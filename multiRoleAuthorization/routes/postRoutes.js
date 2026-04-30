import express from 'express';
import { createPost, updatePost, deletePost } from '../controllers/postCont.js';
import { isAuthenticated, isOwnerOrModerator, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/", isAuthenticated, createPost);
router.put("/:id", isAuthenticated, isOwnerOrModerator, updatePost);
router.delete("/:id", isAuthenticated, requireRole('moderator'), deletePost);

export default router;