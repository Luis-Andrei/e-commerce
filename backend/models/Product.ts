import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
}

const productSchema: Schema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String
});

export default mongoose.model<IProduct>('Product', productSchema); 