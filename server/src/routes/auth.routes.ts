import express from "express";
import { authLimiter } from "../middlewares/rateLimitter";
import { validateRequest } from "../middlewares/validateRequest";
import { signup, signin } from "../controllers/auth.controllers";
import { signupSchema,loginSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/signup", authLimiter, validateRequest(signupSchema), signup);
router.post("/login", authLimiter, validateRequest(loginSchema), signin);

export default router;