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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_jwt_secret_muito_seguro';
// Rota de login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Aqui você deve implementar a lógica de verificação do usuário
        // Por enquanto, vamos apenas retornar um erro
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
}));
// Rota de registro
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Aqui você deve implementar a lógica de criação do usuário
        // Por enquanto, vamos apenas retornar um erro
        res.status(400).json({ message: 'Registro não implementado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
}));
exports.default = router;
