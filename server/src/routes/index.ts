import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import EducationRoutes from './education.routes';

const router = Router();

router.use('/', userRoutes);
router.use('/auth', authRoutes);
router.use('/education', EducationRoutes);

// more routes like auth, admin, feedback, etc.

export default router;
