import express from 'express'
import {deleteInternship, internship , internshipData, searchData, studentsList, updateInternship} from "../Controllers/internshipControllers.js"

const router = express.Router();

router.post('/internship', internship);
router.get('/data/:id', internshipData);
router.get('/studentlist/:page', studentsList);
router.delete('/delIntern/:id', deleteInternship);
router.put('/updateIntern/:id', updateInternship);
router.get('/searchdata/:name', searchData);


export default router;