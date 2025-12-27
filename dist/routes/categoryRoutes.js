"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const categoryController_1 = require("../controllers/categoryController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', categoryController_1.getCategories);
router.get('/slug/:slug', categoryController_1.getCategoryBySlug);
router.get('/:id', categoryController_1.getCategory);
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Category name is required'),
    (0, express_validator_1.body)('slug')
        .trim()
        .notEmpty()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage('Slug must be a valid URL-friendly string'),
], categoryController_1.createCategory);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), categoryController_1.updateCategory);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map