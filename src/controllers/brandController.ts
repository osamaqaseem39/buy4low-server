import { Response } from 'express';
import { validationResult } from 'express-validator';
import Brand from '../models/Brand';
import { AuthRequest } from '../types';

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
export const getBrands = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const brands = await Brand.find().sort('name');

    res.json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get single brand
// @route   GET /api/brands/:id
// @access  Public
export const getBrand = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      res.status(404).json({
        success: false,
        message: 'Brand not found',
      });
      return;
    }

    res.json({
      success: true,
      data: brand,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Create brand
// @route   POST /api/brands
// @access  Private/Admin
export const createBrand = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const brand = await Brand.create(req.body);

    res.status(201).json({
      success: true,
      data: brand,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Update brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
export const updateBrand = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    let brand = await Brand.findById(req.params.id);

    if (!brand) {
      res.status(404).json({
        success: false,
        message: 'Brand not found',
      });
      return;
    }

    brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: brand,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Delete brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
export const deleteBrand = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      res.status(404).json({
        success: false,
        message: 'Brand not found',
      });
      return;
    }

    await Brand.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Brand deleted',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};
