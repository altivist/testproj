import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, me } from '../controllers/authController';
import { authRequired } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/login', [body('login').isLength({ min: 3 }), body('password').isLength({ min: 6 }), validate], login);
router.get('/me', authRequired, me);
router.post('/logout', logout);

export default router;
