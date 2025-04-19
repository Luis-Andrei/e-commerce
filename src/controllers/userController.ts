import { Request, Response } from 'express';
import User, { IUser, IAddress } from '../models/User';

// Extend Request type to include user
interface AuthRequest extends Request {
  user: IUser & { _id: string };
}

// Get user profile
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil do usuário', error });
  }
};

// Update address
export const updateAddress = async (req: AuthRequest, res: Response) => {
  try {
    const { street, number, neighborhood, city, state, postalCode } = req.body;

    // Validate required fields
    if (!street || !number || !neighborhood || !city || !state || !postalCode) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios do endereço' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { 
        address: {
          street,
          number, 
          neighborhood,
          city,
          state,
          postalCode
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar endereço', error });
  }
};

// Delete address
export const deleteAddress = async (req: AuthRequest, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { address: 1 } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar endereço', error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // req.user já está disponível graças ao middleware protect
    const user = req.user;

    res.status(200).json({
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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // Verifica se email já existe (se estiver mudando o email)
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Este email já está em uso'
        });
      }
    }

    // Atualiza apenas os campos permitidos
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          address: updatedUser.address
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Erro ao atualizar perfil'
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Busca o usuário com a senha (que normalmente é excluída das queries)
    const user = await User.findById(req.user._id).select('+password');

    // Verifica se a senha atual está correta
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({
        status: 'error',
        message: 'Senha atual incorreta'
      });
    }

    // Atualiza a senha
    user.password = newPassword;
    await user.save(); // Usa save() para acionar o middleware de hash da senha

    res.status(200).json({
      status: 'success',
      message: 'Senha atualizada com sucesso'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Erro ao alterar senha'
    });
  }
}; 