import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Product from '../models/Product';
import dotenv from 'dotenv';

dotenv.config();

interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Limpar produtos existentes
    await Product.deleteMany({});
    console.log('Produtos existentes removidos');

    // Ler o arquivo products.json
    const productsData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../../../frontend/products.json'),
        'utf-8'
      )
    ) as ProductData[];

    // Adicionar stock = 100 para cada produto
    const productsWithStock = productsData.map(product => ({
      ...product,
      stock: 100
    }));

    // Inserir produtos no banco de dados
    await Product.insertMany(productsWithStock);
    console.log('Produtos inseridos com sucesso');

    mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    process.exit(1);
  }
}

seedProducts(); 