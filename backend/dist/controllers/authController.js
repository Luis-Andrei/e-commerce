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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'seu_jwt_secret_muito_seguro';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, address } = req.body;
        // Verifica se o usuário já existe
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }
        // Cria o novo usuário
        const user = yield User_1.default.create({
            name,
            email,
            password,
            address
        });
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
        // Remove a senha do objeto de resposta
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({
            user: userResponse,
            token
        });
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Busca o usuário e inclui o campo password
        const user = yield User_1.default.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
        // Verifica a senha
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
        // Remove a senha do objeto de resposta
        const userResponse = user.toObject();
        delete userResponse.password;
        res.json({
            user: userResponse,
            token
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
});
exports.login = login;
