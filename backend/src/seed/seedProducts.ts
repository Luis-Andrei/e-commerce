import mongoose from 'mongoose';
import Product from '../models/Product';
import dotenv from 'dotenv';

dotenv.config();

const products = [
  // XIS
  {
    name: 'XIS SALADA',
    description: 'Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e bife.',
    price: 22.00,
    category: 'XIS',
    image: 'https://www.rbsdirect.com.br/imagesrc/25692330.jpg?w=1200&h=630&a=c&version=1575255600'
  },
  {
    name: 'XIS FRANGO',
    description: 'Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e frango.',
    price: 24.00,
    category: 'XIS',
    image: 'https://example.com/xis-frango.jpg'
  },
  {
    name: 'XIS CALABRESA',
    description: 'Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e calabresa.',
    price: 27.00,
    category: 'XIS',
    image: 'https://example.com/xis-calabresa.jpg'
  },
  {
    name: 'XIS BACON',
    description: 'Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e bacon.',
    price: 28.00,
    category: 'XIS',
    image: 'https://example.com/xis-bacon.jpg'
  },
  {
    name: 'XIS CORAÇÃO',
    description: 'Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto e coração.',
    price: 29.00,
    category: 'XIS',
    image: 'https://example.com/xis-coracao.jpg'
  },
  {
    name: 'XIS TUDO',
    description: 'Pão, milho, ervilha, maionese, tomate, ovo, tempero verde, alface, catchup, mostarda, queijo, presunto, bife, frango, calabresa, coração e bacon.',
    price: 29.00,
    category: 'XIS',
    image: 'https://example.com/xis-tudo.jpg'
  },

  // CACHORRO-QUENTE
  {
    name: 'Cachorro-Quente Simples',
    description: 'Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e salsicha.',
    price: 17.00,
    category: 'CACHORRO-QUENTE',
    image: 'https://example.com/cachorro-simples.jpg'
  },
  {
    name: 'Cachorro-Quente Duplo',
    description: 'Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e duas salsichas.',
    price: 20.00,
    category: 'CACHORRO-QUENTE',
    image: 'https://example.com/cachorro-duplo.jpg'
  },
  {
    name: 'Cachorro-Quente de Frango',
    description: 'Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e frango.',
    price: 22.00,
    category: 'CACHORRO-QUENTE',
    image: 'https://example.com/cachorro-frango.jpg'
  },
  {
    name: 'Cachorro-Quente de Carne',
    description: 'Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e carne.',
    price: 22.00,
    category: 'CACHORRO-QUENTE',
    image: 'https://example.com/cachorro-carne.jpg'
  },
  {
    name: 'Cachorro-Quente de Calabresa',
    description: 'Pão, molho de salsicha, catchup, mostarda, milho, ervilha, batata palha, tempero verde e calabresa.',
    price: 24.00,
    category: 'CACHORRO-QUENTE',
    image: 'https://example.com/cachorro-calabresa.jpg'
  },

  // PICADÃO
  {
    name: 'PICADÃO 1 Pessoa',
    description: 'Ovos de codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinhos, carne, frango, coração, calabresa.',
    price: 50.00,
    category: 'PICADÃO',
    image: 'https://example.com/picadao-1p.jpg'
  },
  {
    name: 'PICADÃO 2 Pessoas',
    description: 'Ovos de codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinhos, carne, frango, coração, calabresa.',
    price: 85.00,
    category: 'PICADÃO',
    image: 'https://example.com/picadao-2p.jpg'
  },
  {
    name: 'PICADÃO 3 Pessoas',
    description: 'Ovos de codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinhos, carne, frango, coração, calabresa.',
    price: 108.00,
    category: 'PICADÃO',
    image: 'https://example.com/picadao-3p.jpg'
  },
  {
    name: 'PICADÃO 4 Pessoas',
    description: 'Ovos de codorna, pepino, brócolis, azeitonas, queijo, batatinha frita, polenta, anéis de cebola, empanadinhos, carne, frango, coração, calabresa.',
    price: 140.00,
    category: 'PICADÃO',
    image: 'https://example.com/picadao-4p.jpg'
  },

  // ADICIONAIS
  {
    name: 'Batata Frita',
    description: 'Adicionado dentro do Xis ou cachorro-quente',
    price: 2.00,
    category: 'ADICIONAIS',
    image: 'https://example.com/batata-frita.jpg'
  },
  {
    name: 'Torrada com Ovo',
    description: 'Torrada com ovo.',
    price: 15.00,
    category: 'ADICIONAIS',
    image: 'https://example.com/torrada-ovo.jpg'
  },

  // BEBIDAS
  {
    name: 'Refrigerante Lata Guaraná',
    description: 'Refrigerante Guaraná em lata.',
    price: 5.00,
    category: 'BEBIDAS',
    image: 'https://example.com/guarana-lata.jpg'
  },
  {
    name: 'Refrigerante Lata Pepsi',
    description: 'Refrigerante Pepsi em lata.',
    price: 5.00,
    category: 'BEBIDAS',
    image: 'https://example.com/pepsi-lata.jpg'
  },
  {
    name: 'Guaraná 2L',
    description: 'Refrigerante Guaraná 2 litros.',
    price: 11.00,
    category: 'BEBIDAS',
    image: 'https://example.com/guarana-2l.jpg'
  },
  {
    name: 'Pepsi 2L',
    description: 'Refrigerante Pepsi 2 litros.',
    price: 11.00,
    category: 'BEBIDAS',
    image: 'https://example.com/pepsi-2l.jpg'
  },
  {
    name: 'Cerveja Lata',
    description: 'Cerveja em lata.',
    price: 6.00,
    category: 'BEBIDAS',
    image: 'https://example.com/cerveja-lata.jpg'
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Conectado ao MongoDB');

    // Limpar produtos existentes
    await Product.deleteMany({});
    console.log('Produtos existentes removidos');

    // Inserir novos produtos
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} produtos criados com sucesso`);

    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  } catch (error) {
    console.error('Erro ao criar produtos:', error);
    process.exit(1);
  }
}

seedProducts(); 