import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface TokenPayload {
  userId: string;
}

interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não está definido');
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    (req as AuthRequest).user = {
      userId: user._id.toString()
    };
    
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Export protect as an alias for authenticate for backward compatibility
export const protect = authenticate; 