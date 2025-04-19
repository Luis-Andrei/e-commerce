import { Router } from 'express';
import { 
  getMe as getCurrentUser, 
  updateProfile as updateUser, 
  updateAddress as addAddress, 
  deleteAddress, 
  changePassword 
} from '../controllers/userController';
import { 
  register, 
  login 
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas por autenticação
router.get('/me', authenticate, getCurrentUser);
router.put('/me', authenticate, updateUser);
router.post('/addresses', authenticate, addAddress);
router.delete('/addresses/:id', authenticate, deleteAddress);
router.put('/password', authenticate, changePassword);

export default router; 