"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.getBrand = exports.getBrands = void 0;
const express_validator_1 = require("express-validator");
const Brand_1 = __importDefault(require("../models/Brand"));
// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
const getBrands = async (_req, res) => {
    try {
        const brands = await Brand_1.default.find().sort('name');
        res.json({
            success: true,
            count: brands.length,
            data: brands,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getBrands = getBrands;
// @desc    Get single brand
// @route   GET /api/brands/:id
// @access  Public
const getBrand = async (req, res) => {
    try {
        const brand = await Brand_1.default.findById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getBrand = getBrand;
// @desc    Create brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }
        const brand = await Brand_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: brand,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.createBrand = createBrand;
// @desc    Update brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateBrand = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }
        let brand = await Brand_1.default.findById(req.params.id);
        if (!brand) {
            res.status(404).json({
                success: false,
                message: 'Brand not found',
            });
            return;
        }
        brand = await Brand_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json({
            success: true,
            data: brand,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.updateBrand = updateBrand;
// @desc    Delete brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand_1.default.findById(req.params.id);
        if (!brand) {
            res.status(404).json({
                success: false,
                message: 'Brand not found',
            });
            return;
        }
        await Brand_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Brand deleted',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.deleteBrand = deleteBrand;
//# sourceMappingURL=brandController.js.map