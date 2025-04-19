import express from 'express';
import { protect } from '../middleware/auth';
import { 
  getMe,
  updateAddress,
  deleteAddress,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/userController';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = express.Router();

// Rotas protegidas - precisam de autenticação
router.use(protect);

// Rotas de perfil
router.get('/me', getMe);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);

// Rotas de endereço
router.post('/address', updateAddress);
router.delete('/address', deleteAddress);

// Rota de alteração de senha
router.patch('/password', changePassword);

export default router; 