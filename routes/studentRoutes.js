import express from 'express';

import { 
    createStudent, 
    filterStudents, 
    getStudentByEmail, 
    updateStudentGpa, 
    deleteStudent, 
    getStudentsByCityCount 
} from '../controllers/studentCont.js';

const router = express.Router();

router.post("/", createStudent);
router.get("/", filterStudents);
router.get("/count/city", getStudentsByCityCount);
router.get("/email/:email", getStudentByEmail);
router.put("/email/:email/gpa", updateStudentGpa);
router.delete("/email/:email", deleteStudent);

export default router;