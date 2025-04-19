import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interfaces
interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  lat: number;
  lng: number;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  address: Address;
  createdAt: Date;
}

// Interface para o documento do Mongoose com métodos
interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface para o modelo com métodos estáticos (se necessário)
interface IUserModel extends Model<IUserDocument> {
  // Aqui você pode adicionar métodos estáticos
}

// Schemas
const addressSchema = new mongoose.Schema<Address>({
  street: {
    type: String,
    required: [true, 'Rua é obrigatória']
  },
  number: {
    type: String,
    required: [true, 'Número é obrigatório']
  },
  complement: String,
  neighborhood: {
    type: String,
    required: [true, 'Bairro é obrigatório']
  },
  city: {
    type: String,
    required: [true, 'Cidade é obrigatória']
  },
  state: {
    type: String,
    required: [true, 'Estado é obrigatório']
  },
  postalCode: {
    type: String,
    required: [true, 'CEP é obrigatório']
  },
  lat: {
    type: Number,
    required: [true, 'Latitude é obrigatória']
  },
  lng: {
    type: Number,
    required: [true, 'Longitude é obrigatória']
  }
});

const userSchema = new mongoose.Schema<IUserDocument>({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: 6,
    select: false
  },
  address: {
    type: addressSchema,
    required: [true, 'Endereço é obrigatório']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para criptografar a senha
userSchema.pre('save', async function(next) {
  // Garante que só executa se a senha foi modificada
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar senhas com verificação de tipo
userSchema.methods.comparePassword = async function(
  this: IUserDocument,
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) {
    throw new Error('Password not available for comparison');
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Criar e exportar o modelo
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default User; 