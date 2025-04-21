"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rotas protegidas por autenticação
router.post('/', auth_1.authenticate, orderController_1.createOrder);
router.get('/', auth_1.authenticate, orderController_1.getOrders);
router.get('/:id', auth_1.authenticate, orderController_1.getOrderById);
exports.default = router;
