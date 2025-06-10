import express from "express";
import { authLimiter,otpRateLimiter,loginLimiter } from "../middlewares/rateLimitter";
import { validateRequest } from "../middlewares/validateRequest";
import { signup, signin, sendOtp, verifyOtp } from "../controllers/auth.controllers";
import { signupSchema,loginSchema, sendOtpSchema, verifyOtpSchema } from "../schemas/auth.schema";

const router = express.Router();

// User Authentication Routes
router.post("/signup", authLimiter, validateRequest(signupSchema), signup);
router.post("/login", loginLimiter, validateRequest(loginSchema), signin);

// Verification Routes
router.post("/send-otp", otpRateLimiter, validateRequest(sendOtpSchema), sendOtp);
router.post("/verify-email", validateRequest(verifyOtpSchema), verifyOtp);

export default router;