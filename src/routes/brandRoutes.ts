import express from 'express';
import { body } from 'express-validator';
import {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/brandController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getBrands);
router.get('/:id', getBrand);

router.post(
  '/',
  protect,
  authorize('admin'),
  [
    body('name').trim().notEmpty().withMessage('Brand name is required'),
    body('slug')
      .trim()
      .notEmpty()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Slug must be a valid URL-friendly string'),
  ],
  createBrand
);

router.put('/:id', protect, authorize('admin'), updateBrand);
router.delete('/:id', protect, authorize('admin'), deleteBrand);

export default router;

