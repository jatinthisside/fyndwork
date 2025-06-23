import { Router } from 'express';
import { getAllUsers, setupStudentProfile, getStudentProfile, deleteStudentAccount } from '../controllers/user.controllers';
import { authenticate, decodeToken } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { studentProfileSchema } from '../schemas/profile.schema';

const router = Router();

router.get('/', getAllUsers); // GET /api/v1/users
router.post('/profile/student', decodeToken, authenticate("student"), validateRequest(studentProfileSchema), setupStudentProfile);
router.get('/profile/student', decodeToken, authenticate("student"), getStudentProfile); 
router.patch('/profile/student', decodeToken, authenticate("student"), deleteStudentAccount); 

export default router;
