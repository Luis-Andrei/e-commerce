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
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const Product_1 = __importDefault(require("./models/Product"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Conexão com MongoDB local
mongoose_1.default.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('MongoDB conectado');
    // Criar alguns produtos de exemplo
    try {
        const count = yield Product_1.default.countDocuments();
        if (count === 0) {
            yield Product_1.default.create([
                {
                    name: 'Pizza Margherita',
                    description: 'Pizza tradicional italiana com molho de tomate, mussarela e manjericão',
                    price: 45.90,
                    category: 'Pizzas'
                },
                {
                    name: 'Pizza Pepperoni',
                    description: 'Pizza com molho de tomate, mussarela e pepperoni',
                    price: 49.90,
                    category: 'Pizzas'
                },
                {
                    name: 'Coca-Cola 2L',
                    description: 'Refrigerante Coca-Cola 2 litros',
                    price: 12.90,
                    category: 'Bebidas'
                }
            ]);
            console.log('Produtos de exemplo criados');
        }
    }
    catch (error) {
        console.error('Erro ao criar produtos de exemplo:', error);
    }
}))
    .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
});
// Rotas
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
