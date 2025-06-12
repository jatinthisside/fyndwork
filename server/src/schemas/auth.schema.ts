import {z} from 'zod';

export const signupSchema = z.object({
    name: z.string({required_error:"name is required", invalid_type_error:"name must be a valid string"}).min(3, "Name must be atleast 3 characters long"),
    email: z.string({required_error:"email is required"}).email("Invalid email format"),
    role: z.enum(['student', 'company', 'admin']),
    about: z.string({invalid_type_error:"about should be a valid string", required_error:"about is required"}),
    city: z.string({invalid_type_error:"city should be a valid string",required_error:"city is required"}),
    state: z.string({invalid_type_error:"state should be a valid string",required_error:"state is required"}),
    country: z.string({invalid_type_error:"country should be a valid string",required_error:"country is required"}),
    pincode: z.number({invalid_type_error:"pincode should be a valid number",required_error:"pincode is required"}),
    street: z.string({invalid_type_error:"street address should be a valid string",required_error:"street is required"}),
    password: z.string({invalid_type_error:"password should be a valid string",required_error:"password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number"),
    profile_photo: z.string({invalid_type_error:"profile_photo should be a valid string",required_error:"profile_photo is required"}),
});

export const loginSchema = z.object({
    email: z.string({required_error:"email id is required!"}).email("Invalid email format"),
    password: z.string({required_error:"password field is required"}).min(6, "Password must be at least 6 characters long"),
})

export const sendOtpSchema = z.object({
    email: z.string({required_error:"email id is required!"}).email("Invalid email format"),
})

export const verifyOtpSchema = z.object({
    email: z.string({required_error:"email id is required!"}).email("Invalid email format"),
    otp: z.string({required_error:"otp is required"}).length(6, "OTP must be exactly 6 characters long"),
})
