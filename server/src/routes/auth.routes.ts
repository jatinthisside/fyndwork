import { Router } from 'express';
import { authControllers } from '../controllers';

const router = Router();
router.post('/', authControllers.register);

export default router;