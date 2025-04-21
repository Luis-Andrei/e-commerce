"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rotas públicas
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
// Rotas protegidas por autenticação
router.get('/me', auth_1.authenticate, userController_1.getMe);
router.put('/me', auth_1.authenticate, userController_1.updateProfile);
router.post('/addresses', auth_1.authenticate, userController_1.updateAddress);
router.delete('/addresses/:id', auth_1.authenticate, userController_1.deleteAddress);
router.put('/password', auth_1.authenticate, userController_1.changePassword);
exports.default = router;
