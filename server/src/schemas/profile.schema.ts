import { z } from "zod";

// Education sub-schema
const educationSchema = z.object({
  institution: z.string().min(5),
  degree: z.string().min(2),
  grade: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
});

export const studentProfileSchema = z.object({
  skills: z.array(z.string().min(1)).optional(),
  portfolio: z.string().url().optional(),
  resume: z.string().url().optional(),
  dob: z.coerce.date().refine(
    dob => {
      const age = new Date().getFullYear() - dob.getFullYear();
      return age >= 16 && age <= 100;
    },
    { message: "Must be between 16-100 years old" }
  ),
});

const objectIdSchema = z.string().refine(
    val => /^[0-9a-fA-F]{24}$/.test(val),
    { message: "Invalid ObjectId format" }
  );
  
  export const certificateSchema = z.object({
    application: objectIdSchema,
    certificate_url: z.string().url("Invalid URL format"),
    issued_by: objectIdSchema,
  });