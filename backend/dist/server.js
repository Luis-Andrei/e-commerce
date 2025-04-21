"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Servir arquivos estáticos
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../../frontend/public/images')));
// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Configuração do MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('MongoDB conectado');
})
    .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
});
// Rotas
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
