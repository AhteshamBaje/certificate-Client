import express from 'express'
import internship from "../Controllers/internshipControllers.js"

const router = express.Router();

router.post('/internship', internship);

export default router;