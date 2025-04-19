import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_jwt_secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const user = await User.create({
      name,
      email,
      password,
      address
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d'
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erro ao registrar usuário',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d'
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erro ao fazer login',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}; 