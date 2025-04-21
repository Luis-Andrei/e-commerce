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
exports.changePassword = exports.deleteAddress = exports.updateAddress = exports.updateProfile = exports.getProfile = exports.getMe = void 0;
const User_1 = __importDefault(require("../models/User"));
// Get user profile
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
        const user = yield User_1.default.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar perfil do usuário', error });
    }
});
exports.getMe = getMe;
// Get user profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar perfil'
        });
    }
});
exports.getProfile = getProfile;
// Update user profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
        const { name, email } = req.body;
        // Verifica se email já existe (se estiver mudando o email)
        if (email) {
            const existingUser = yield User_1.default.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: 'Este email já está em uso' });
            }
        }
        // Atualiza apenas os campos permitidos
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar perfil' });
    }
});
exports.updateProfile = updateProfile;
// Update user address
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
        const { street, number, neighborhood, city, state, zipCode } = req.body;
        // Validate required fields
        if (!street || !number || !neighborhood || !city || !state || !zipCode) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios do endereço' });
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, {
            address: {
                street,
                number,
                neighborhood,
                city,
                state,
                postalCode: zipCode
            }
        }, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        res.status(500).json({ message: 'Erro ao atualizar endereço', error });
    }
});
exports.updateAddress = updateAddress;
// Delete user address
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { $unset: { address: 1 } }, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar endereço', error });
    }
});
exports.deleteAddress = deleteAddress;
// Change user password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
        const { currentPassword, newPassword } = req.body;
        // Busca o usuário com a senha (que normalmente é excluída das queries)
        const user = yield User_1.default.findById(userId).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        // Verifica se a senha atual está correta
        if (!(yield user.comparePassword(currentPassword))) {
            return res.status(401).json({ message: 'Senha atual incorreta' });
        }
        // Atualiza a senha
        user.password = newPassword;
        yield user.save(); // Usa save() para acionar o middleware de hash da senha
        res.json({ message: 'Senha atualizada com sucesso' });
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao alterar senha' });
    }
});
exports.changePassword = changePassword;
