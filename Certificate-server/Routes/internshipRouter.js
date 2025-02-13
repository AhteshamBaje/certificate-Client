import express from 'express'
import {internship , internshipData, studentsList} from "../Controllers/internshipControllers.js"

const router = express.Router();

router.post('/internship', internship);
router.get('/data/:id', internshipData);
router.get('/studentlist', studentsList);


export default router;