"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET não está definido');
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield User_1.default.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        req.user = {
            userId: user._id.toString()
        };
        next();
    }
    catch (error) {
        console.error('Erro de autenticação:', error);
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.authenticate = authenticate;
// Export protect as an alias for authenticate for backward compatibility
exports.protect = exports.authenticate;
