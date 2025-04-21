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
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        // Verificar se o usuário já existe
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }
        // Criar novo usuário
        const user = new User_1.default({
            name,
            email,
            password
        });
        yield user.save();
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não está definido');
        }
        // Gerar token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({
            message: 'Erro ao registrar usuário',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }
        // Encontrar usuário
        const user = yield User_1.default.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
        // Verificar senha
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não está definido');
        }
        // Gerar token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({
            message: 'Erro ao fazer login',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});
exports.login = login;
