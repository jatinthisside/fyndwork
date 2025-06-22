import { Router } from 'express';
import { getAllUsers,setupStudentProfile } from '../controllers/user.controllers';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/', getAllUsers); // GET /api/v1/users
router.post('/profile/student', authenticate("all") , setupStudentProfile);

export default router;
