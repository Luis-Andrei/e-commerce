import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Descrição é obrigatória']
    },
    price: {
      type: Number,
      required: [true, 'Preço é obrigatório'],
      min: [0, 'Preço não pode ser negativo']
    },
    category: {
      type: String,
      required: [true, 'Categoria é obrigatória']
    },
    image: {
      type: String,
      required: [true, 'Imagem é obrigatória']
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IProduct>('Product', productSchema); 