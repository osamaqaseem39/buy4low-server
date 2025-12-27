"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryBySlug = exports.getCategory = exports.getCategories = void 0;
const express_validator_1 = require("express-validator");
const Category_1 = __importDefault(require("../models/Category"));
// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (_req, res) => {
    try {
        const categories = await Category_1.default.find({ isActive: true })
            .populate('parent', 'name slug')
            .sort('name');
        res.json({
            success: true,
            count: categories.length,
            data: categories,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getCategories = getCategories;
// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategory = async (req, res) => {
    try {
        const category = await Category_1.default.findById(req.params.id)
            .populate('parent', 'name slug');
        if (!category || !category.isActive) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
            return;
        }
        res.json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getCategory = getCategory;
// @desc    Get single category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
const getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category_1.default.findOne({ slug: req.params.slug, isActive: true })
            .populate('parent', 'name slug');
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
            return;
        }
        res.json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getCategoryBySlug = getCategoryBySlug;
// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }
        const category = await Category_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.createCategory = createCategory;
// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }
        let category = await Category_1.default.findById(req.params.id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
            return;
        }
        category = await Category_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.updateCategory = updateCategory;
// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
    try {
        const category = await Category_1.default.findById(req.params.id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
            return;
        }
        await Category_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Category deleted',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map