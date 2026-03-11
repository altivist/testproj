import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createApplication,
  createTestDrive,
  getCarById,
  getCars,
  getModels
} from '../controllers/publicController';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/cars', getCars);
router.get('/cars/:id', [param('id').isInt({ min: 1 }), validate], getCarById);
router.get('/models', getModels);

router.post(
  '/applications',
  [
    body('fullName').isLength({ min: 2 }),
    body('phone').isLength({ min: 5 }),
    body('email').isEmail(),
    body('carId').isInt({ min: 1 }),
    body('message').isLength({ min: 5 }),
    validate
  ],
  createApplication
);

router.post(
  '/test-drives',
  [
    body('fullName').isLength({ min: 2 }),
    body('phone').isLength({ min: 5 }),
    body('email').isEmail(),
    body('carId').isInt({ min: 1 }),
    body('preferredDate').isISO8601(),
    body('comment').isLength({ min: 3 }),
    validate
  ],
  createTestDrive
);

export default router;
