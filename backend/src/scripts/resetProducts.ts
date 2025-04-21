import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';

dotenv.config();

const products = [
  { name: "XIS SALADA", description: "Pão, hambúrguer, queijo, presunto, ovo, alface, tomate, milho, ervilha, batata palha e maionese", price: 25.00, category: "Xis", image: "/images/xis-salada.jpg", stock: 100 },
  { name: "XIS FRANGO", description: "Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e frango.", price: 24, category: "Xis", image: "/images/xis-frango.jpg", stock: 100 },
  { name: "XIS CALABRESA", description: "Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e calabresa.", price: 27, category: "Xis", image: "/images/xis-calabresa.jpg", stock: 100 },
  { name: "XIS BACON", description: "Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e bacon.", price: 28, category: "Xis", image: "/images/xis-bacon.jpg", stock: 100 },
  { name: "XIS CORAÇÃO", description: "Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e coração.", price: 29, category: "Xis", image: "/images/xis-coracao.jpg", stock: 100 },
  { name: "XIS TUDO", description: "Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto, calabresa, coração e frango.", price: 29, category: "Xis", image: "/images/xis-tudo.jpg", stock: 100 },
  
  { name: "Cachorro-quente Simples", description: "Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde, salsicha.", price: 17, category: "Cachorro-quente", image: "/images/cachorro-quente-simples.jpg", stock: 100 },
  { name: "Cachorro-quente Duplo", description: "Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde, duas salsichas.", price: 20, category: "Cachorro-quente", image: "/images/cachorro-quente-duplo.jpg", stock: 100 },
  { name: "Cachorro-quente de Frango", description: "Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e frango.", price: 22, category: "Cachorro-quente", image: "/images/cachorro-quente-duplo.jpg", stock: 100 },
  { name: "Cachorro-quente de Carne", description: "Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e carne.", price: 22, category: "Cachorro-quente", image: "/images/cachorro-quente-duplo.jpg", stock: 100 },
  { name: "Cachorro-quente de Calabresa", description: "Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e calabresa.", price: 24, category: "Cachorro-quente", image: "/images/cachorro-quente-duplo.jpg", stock: 100 },
  
  { name: "Picadão 1 pessoa", description: "Ovos codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinho, carne res, frango, coração, calabresa.", price: 50, category: "Picadão", image: "/images/picadao-1.jpg", stock: 100 },
  { name: "Picadão 2 pessoas", description: "Ovos codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinho, carne res, frango, coração, calabresa.", price: 85, category: "Picadão", image: "/images/picadao-2.jpg", stock: 100 },
  { name: "Picadão 3 pessoas", description: "Ovos codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinho, carne res, frango, coração, calabresa.", price: 108, category: "Picadão", image: "/images/picadao-3.jpg", stock: 100 },
  { name: "Picadão 4 pessoas", description: "Ovos codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinho, carne res, frango, coração, calabresa.", price: 140, category: "Picadão", image: "/images/picadao-4.jpg", stock: 100 },
  
  { name: "Batata frita", description: "Adicional de batata frita.", price: 2, category: "Adicional", image: "/images/batata-frita.jpg", stock: 100 },
  { name: "Torrada com ovo", description: "Torrada com ovo.", price: 15, category: "Adicional", image: "/images/torrada-ovo.jpg", stock: 100 },
  { name: "Porção de batata frita pequena", description: "Porção de batata frita pequena.", price: 15, category: "Adicional", image: "/images/batata-frita.jpg", stock: 100 },
  { name: "Porção de batata frita média", description: "Porção de batata frita média.", price: 25, category: "Adicional", image: "/images/batata-frita.jpg", stock: 100 },
  { name: "Porção de batata frita grande", description: "Porção de batata frita grande.", price: 35, category: "Adicional", image: "/images/batata-frita.jpg", stock: 100 },
  
  { name: "Refri lata Guaraná", description: "Refrigerante lata Guaraná.", price: 5, category: "Bebida", image: "/images/refri-guarana-lata.jpg", stock: 100 },
  { name: "Refri lata Pepsi", description: "Refrigerante lata Pepsi.", price: 5, category: "Bebida", image: "/images/refri-pepsi-lata.jpg", stock: 100 },
  { name: "Guaraná 2L", description: "Refrigerante Guaraná 2L.", price: 11, category: "Bebida", image: "/images/refri-guarana-2l.jpg", stock: 100 },
  { name: "Pepsi 2L", description: "Refrigerante Pepsi 2L.", price: 11, category: "Bebida", image: "/images/refri-pepsi-2l.jpg", stock: 100 },
  { name: "Polar Lata", description: "Cerveja Polar lata.", price: 6, category: "Bebida", image: "/images/Polar-Lata.jpg", stock: 100 },
  { name: "Bhahma Lata", description: "Cerveja Bhahma lata.", price: 6, category: "Bebida", image: "/images/Bhahma-Lata.jpg", stock: 100 },
  { name: "Schin Lata", description: "Cerveja Schin lata.", price: 6, category: "Bebida", image: "/images/Schin-Lata.jpg", stock: 100 },
  { name: "Skol Lata", description: "Cerveja Skol lata.", price: 6, category: "Bebida", image: "/images/Skol-Lata.jpg", stock: 100 }
];

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function resetProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Limpar todos os produtos
    await Product.deleteMany({});
    console.log('Produtos existentes removidos');

    // Inserir novos produtos
    await Product.insertMany(products);
    console.log('Novos produtos inseridos com sucesso');

    mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

resetProducts(); 