import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product'; // ajuste o caminho conforme seu projeto

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

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
        image: '/images/camiseta-rocketseat.png',
        category: 'Vestuário'
      },
      {
        name: 'Mouse Gamer RGB',
        price: 99.99,
        description: 'Mouse gamer com iluminação RGB e 7 botões programáveis.',
        image: '/images/mouse-gamer.png',
        category: 'Acessórios'
      },
      {
        name: 'Teclado Mecânico',
        price: 149.90,
        description: 'Teclado mecânico switch blue com iluminação LED.',
        image: '/images/teclado-mecanico.png',
        category: 'Acessórios'
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