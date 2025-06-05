import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controllers';

const router = Router();

router.get('/', getAllUsers); // GET /api/v1/users

export default router;
