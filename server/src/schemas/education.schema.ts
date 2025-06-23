import {z} from 'zod';

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string().min(3),
  grade: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});