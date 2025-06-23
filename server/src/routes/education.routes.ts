import express from "express";
import { authenticate } from "../middlewares/auth";
import { addEducation, getEducations } from "../controllers/education.controllers";
import { validateRequest } from "../middlewares/validateRequest";
import { EducationSchema } from "../schemas/education.schema";

const router = express.Router();

router.post("/add", authenticate('student'), validateRequest(EducationSchema), addEducation);
router.get("/", authenticate('student'), getEducations);

export default router;