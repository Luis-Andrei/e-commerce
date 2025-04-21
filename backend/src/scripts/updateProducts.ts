import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function updateProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Atualizando cervejas
    await Product.updateOne(
      { name: 'Skol Lata' },
      { image: '/images/Skol-Lata.jpg' }
    );

    // Atualizando porções de batata
    await Product.updateOne(
      { name: 'Porção de batata frita' },
      { image: '/images/batata-frita.jpg' }
    );

    // Atualizando cachorros-quentes
    await Product.updateOne(
      { name: 'Cachorro-quente de Frango' },
      { image: '/images/cachorro-quente-duplo.jpg' }
    );

    await Product.updateOne(
      { name: 'Cachorro-quente de Carne' },
      { image: '/images/cachorro-quente-duplo.jpg' }
    );

    await Product.updateOne(
      { name: 'Cachorro-quente de Calabresa' },
      { image: '/images/cachorro-quente-duplo.jpg' }
    );

    console.log('Produtos atualizados com sucesso');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

updateProducts(); 