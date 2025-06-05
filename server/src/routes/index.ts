import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

router.use('/users', userRoutes);;

// more routes like auth, admin, feedback, etc.

export default router;
