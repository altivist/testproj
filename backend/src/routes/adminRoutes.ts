import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createCar,
  deleteCar,
  getApplications,
  getTestDrives,
  updateCar
} from '../controllers/adminController';
import { adminOnly, authRequired } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authRequired, adminOnly);

const carValidation = [
  body('modelId').isInt({ min: 1 }),
  body('year').isInt({ min: 1950 }),
  body('price').isFloat({ min: 0 }),
  body('mileage').isInt({ min: 0 }),
  body('engine').isLength({ min: 2 }),
  body('transmission').isLength({ min: 2 }),
  body('fuelType').isLength({ min: 2 }),
  body('color').isLength({ min: 2 }),
  body('description').isLength({ min: 10 }),
  body('imageUrl').isURL(),
  body('status').isIn(['AVAILABLE', 'RESERVED', 'SOLD']),
  validate
];

router.post('/cars', carValidation, createCar);
router.put('/cars/:id', [param('id').isInt({ min: 1 }), ...carValidation], updateCar);
router.delete('/cars/:id', [param('id').isInt({ min: 1 }), validate], deleteCar);
router.get('/applications', getApplications);
router.get('/test-drives', getTestDrives);

export default router;
