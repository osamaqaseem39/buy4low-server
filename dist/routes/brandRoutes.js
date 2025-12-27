"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const brandController_1 = require("../controllers/brandController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', brandController_1.getBrands);
router.get('/:id', brandController_1.getBrand);
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Brand name is required'),
    (0, express_validator_1.body)('slug')
        .trim()
        .notEmpty()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage('Slug must be a valid URL-friendly string'),
], brandController_1.createBrand);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), brandController_1.updateBrand);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), brandController_1.deleteBrand);
exports.default = router;
//# sourceMappingURL=brandRoutes.js.map