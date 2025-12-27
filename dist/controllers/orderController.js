"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrder = exports.getOrders = exports.getMyOrders = exports.createOrder = void 0;
const express_validator_1 = require("express-validator");
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = __importDefault(require("../models/Product"));
// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }
        const { items, shippingAddress, paymentMethod } = req.body;
        // Calculate total and verify products
        let totalAmount = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await Product_1.default.findById(item.product);
            if (!product || !product.isActive) {
                res.status(404).json({
                    success: false,
                    message: `Product ${item.product} not found`,
                });
                return;
            }
            if (product.stock < item.quantity) {
                res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
                return;
            }
            totalAmount += product.price * item.quantity;
            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image: product.thumbnail || product.images[0],
            });
        }
        const order = await Order_1.default.create({
            user: req.user?._id?.toString() || '',
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });
        // Update product stock
        for (const item of items) {
            await Product_1.default.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity },
            });
        }
        res.status(201).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.createOrder = createOrder;
// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find({ user: req.user?._id?.toString() })
            .populate('items.product', 'name images')
            .sort('-createdAt');
        res.json({
            success: true,
            count: orders.length,
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getMyOrders = getMyOrders;
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (_req, res) => {
    try {
        const orders = await Order_1.default.find()
            .populate('user', 'name email')
            .populate('items.product', 'name images')
            .sort('-createdAt');
        res.json({
            success: true,
            count: orders.length,
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getOrders = getOrders;
// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product');
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }
        // Make sure user owns the order or is admin
        if (order.user.toString() !== req.user?._id?.toString() &&
            req.user?.role !== 'admin') {
            res.status(403).json({
                success: false,
                message: 'Not authorized to access this order',
            });
            return;
        }
        res.json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.getOrder = getOrder;
// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        const order = await Order_1.default.findById(req.params.id);
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }
        if (orderStatus)
            order.orderStatus = orderStatus;
        if (paymentStatus)
            order.paymentStatus = paymentStatus;
        await order.save();
        res.json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=orderController.js.map