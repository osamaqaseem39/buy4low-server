"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.protect, [
    (0, express_validator_1.body)('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
    (0, express_validator_1.body)('items.*.product').notEmpty().withMessage('Product ID is required'),
    (0, express_validator_1.body)('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    (0, express_validator_1.body)('shippingAddress.fullName').trim().notEmpty().withMessage('Full name is required'),
    (0, express_validator_1.body)('shippingAddress.address').trim().notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
    (0, express_validator_1.body)('shippingAddress.state').trim().notEmpty().withMessage('State is required'),
    (0, express_validator_1.body)('shippingAddress.zipCode').trim().notEmpty().withMessage('Zip code is required'),
    (0, express_validator_1.body)('shippingAddress.country').trim().notEmpty().withMessage('Country is required'),
    (0, express_validator_1.body)('shippingAddress.phone').trim().notEmpty().withMessage('Phone is required'),
    (0, express_validator_1.body)('paymentMethod').trim().notEmpty().withMessage('Payment method is required'),
], orderController_1.createOrder);
router.get('/my-orders', auth_1.protect, orderController_1.getMyOrders);
router.get('/:id', auth_1.protect, orderController_1.getOrder);
router.get('/', auth_1.protect, (0, auth_1.authorize)('admin'), orderController_1.getOrders);
router.put('/:id/status', auth_1.protect, (0, auth_1.authorize)('admin'), orderController_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map