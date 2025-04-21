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
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Product_1 = __importDefault(require("../models/Product"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
function seedProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log('Conectado ao MongoDB');
            // Limpar produtos existentes
            yield Product_1.default.deleteMany({});
            console.log('Produtos existentes removidos');
            // Ler o arquivo products.json
            const productsData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../frontend/products.json'), 'utf-8'));
            // Adicionar stock = 100 para cada produto
            const productsWithStock = productsData.map(product => (Object.assign(Object.assign({}, product), { stock: 100 })));
            // Inserir produtos no banco de dados
            yield Product_1.default.insertMany(productsWithStock);
            console.log('Produtos inseridos com sucesso');
            mongoose_1.default.disconnect();
            console.log('Desconectado do MongoDB');
        }
        catch (error) {
            console.error('Erro ao popular banco de dados:', error);
            process.exit(1);
        }
    });
}
seedProducts();
