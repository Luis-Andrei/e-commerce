import { Request, Response } from 'express';
import User from '../models/User';

interface TokenPayload {
  userId: string;
  role?: string;
}

interface AuthRequest extends Request {
  user?: TokenPayload;
}

// Get user profile
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil do usuário', error });
  }
};

// Get user profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar perfil'
    });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { name, email } = req.body;

    // Verifica se email já existe (se estiver mudando o email)
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Este email já está em uso' });
      }
    }

    // Atualiza apenas os campos permitidos
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar perfil' });
  }
};

// Update user address
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { street, number, neighborhood, city, state, zipCode } = req.body;

    // Validate required fields
    if (!street || !number || !neighborhood || !city || !state || !zipCode) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios do endereço' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        address: {
          street,
          number, 
          neighborhood,
          city,
          state,
          postalCode: zipCode
        }
      },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error);
    res.status(500).json({ message: 'Erro ao atualizar endereço', error });
  }
};

// Delete user address
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $unset: { address: 1 } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar endereço', error });
  }
};

// Change user password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { currentPassword, newPassword } = req.body;

    // Busca o usuário com a senha (que normalmente é excluída das queries)
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha atual está correta
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }

    // Atualiza a senha
    user.password = newPassword;
    await user.save(); // Usa save() para acionar o middleware de hash da senha

    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao alterar senha' });
  }
}; 