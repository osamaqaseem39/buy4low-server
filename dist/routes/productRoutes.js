"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', productController_1.getProducts);
router.get('/:id', productController_1.getProduct);
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Product name is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('sku').trim().notEmpty().withMessage('SKU is required'),
    (0, express_validator_1.body)('category').notEmpty().withMessage('Category is required'),
    (0, express_validator_1.body)('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
], productController_1.createProduct);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), productController_1.updateProduct);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map