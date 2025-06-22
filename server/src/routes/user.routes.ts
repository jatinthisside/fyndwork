import { Router } from 'express';
import { getAllUsers,setupStudentProfile } from '../controllers/user.controllers';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { studentProfileSchema } from '../schemas/profile.schema';

const router = Router();

router.get('/', getAllUsers); // GET /api/v1/users
router.post('/profile/student', authenticate("student"), validateRequest(studentProfileSchema), setupStudentProfile);

export default router;
