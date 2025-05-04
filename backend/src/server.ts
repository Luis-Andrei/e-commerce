import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import Product from './models/Product';

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Servir arquivos estáticos
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Configuração do MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB conectado');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB conectado');

    await Product.deleteMany();
    console.log('Coleção de produtos limpa');

    const produtos = [
      {
        name: 'Camiseta Rocketseat',
        price: 49.90,
        description: 'Camiseta oficial da Rocketseat na cor preta.',
        image: '/images/camiseta-rocketseat.png'
      },
      {
        name: 'Mouse Gamer RGB',
        price: 99.99,
        description: 'Mouse gamer com iluminação RGB e 7 botões programáveis.',
        image: '/images/mouse-gamer.png'
      },
      {
        name: 'Teclado Mecânico',
        price: 149.90,
        description: 'Teclado mecânico switch blue com iluminação LED.',
        image: '/images/teclado-mecanico.png'
      }
    ];

    await Product.insertMany(produtos);
    console.log('Produtos adicionados com sucesso');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular banco:', error);
    process.exit(1);
  }
};

seed(); 