import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function listProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB');

    const products = await Product.find();
    console.log('Produtos no banco de dados:');
    products.forEach(product => {
      console.log(`Nome: ${product.name}`);
      console.log(`Imagem: ${product.image}`);
      console.log('---');
    });

    mongoose.disconnect();
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

listProducts(); 