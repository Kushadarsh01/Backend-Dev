import express from 'express';

import { 
    getAverageGpaByDept, 
    getPopularCourses 
} from '../controllers/reportCont.js';

const router = express.Router();

router.get("/gpaByDept", getAverageGpaByDept);
router.get("/popularCourses", getPopularCourses);

export default router;