"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Rotas públicas
router.get('/', productController_1.getProducts);
router.get('/:id', productController_1.getProductById);
// Rotas protegidas (requerem autenticação)
router.post('/', auth_1.authenticate, productController_1.createProduct);
router.put('/:id', auth_1.authenticate, productController_1.updateProduct);
router.delete('/:id', auth_1.authenticate, productController_1.deleteProduct);
exports.default = router;
