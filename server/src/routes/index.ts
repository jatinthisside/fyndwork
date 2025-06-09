import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

// more routes like auth, admin, feedback, etc.

export default router;
